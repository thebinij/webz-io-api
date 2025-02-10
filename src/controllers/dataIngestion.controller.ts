import { Request, Response } from "express";
import logger from "@config/winston";
import { DataIngestionService } from "@services/dataIngestion.service";
import { APIConfig, APIType } from "@interfaces/api.interface";
import { addWaitTime } from "@utils/common";

export class DataIngestionController {
  private dataIngestionService: DataIngestionService;

  // Global lock object where keys are configId and values are booleans indicating lock status
  // TODO: Move ingestionLocks to Redis to manage locks in a distributed environment
  private ingestionLocks: { [configId: string]: boolean } = {};

  constructor(dataIngestionService: DataIngestionService) {
    this.dataIngestionService = dataIngestionService;
  }

  async ingestDataByConfigId(req: Request, res: Response): Promise<void> {
    const { configId } = req.params;

    try {
      const payload = req.body;

      // Prevent multiple ingestion processes from running concurrently
      if (this.isIngestionInProgress(configId)) {
        res.status(400).json({
          message: `Data ingestion for configId ${configId} is already in progress. Please wait.`,
        });
        return;
      }

      // Set a lock for the current configId
      this.setIngestionLock(configId);

      // Respond immediately indicating the process is initiated
      res.status(200).json({
        message:
          "Data ingestion initiated successfully. Please check status for updates.",
      });

      // TODO: In the future, handle background ingestion via a job queue system like BullMQ or RabbitMQ
      // This would allow better scalability, retry logic, and processing control for long-running tasks.
      this.startBackgroundIngestion(configId, payload);
    } catch (error: any) {
      this.releaseIngestionLock(configId);
      logger.error("Error during data ingestion by config ID:", {
        message: error.message,
        stack: error.stack,
      });
      res
        .status(500)
        .json({ message: "Error during data ingestion", error: error.message });
    }
  }

  // Check if ingestion is in progress for the given configId
  private isIngestionInProgress(configId: string): boolean {
    return this.ingestionLocks[configId] === true;
  }

  // Set a lock for the given configId
  private setIngestionLock(configId: string): void {
    this.ingestionLocks[configId] = true;
  }

  // Release the lock for the given configId
  private releaseIngestionLock(configId: string): void {
    this.ingestionLocks[configId] = false;
  }

  private async startBackgroundIngestion(
    configId: string,
    payload: any
  ): Promise<void> {
    try {
      const defaultApiConfig: APIConfig = {
        apiType: APIType.REST,
        methodType: "GET",
        baseURL: "https://api.webz.io",
        endpointName: `/newsApiLite?token=${process.env.WEBZ_TOKEN}`,
        timeout: "15",
        requestFormat: "application/json",
        responseFormat: "application/json",
      };

      let config: APIConfig = defaultApiConfig;

      if (configId) {
        // TODO: Fetch APIConfig from database in future
        // config = await fetchAPIConfigById(configId);
      }

      let result;
      let previousEndpoint = config.endpointName;
      let count = 0;

      do {
        count++;
        logger.info(`Loop ${count}: Fetching data from ${config.endpointName}`);

        // Execute the ingestion asynchronously without blocking
        result = await this.dataIngestionService.fetchData(config, payload);
        // here, Webz.io return data in posts keys
        await this.dataIngestionService.insertBatchData(result?.posts || []);

        // Wait for 1 second before making the next request (rate limiting)
        await addWaitTime(1000);

        // Check if 'next' endpoint is valid to prevent infinite looping
        if (!result?.next || result.next === previousEndpoint) {
          logger.warn(
            `Potential infinite loop detected. Stopping ingestion for configId: ${configId}`
          );
          break;
        }

        // TODO : REMOVE this. for testing purpose
        if (count == 3) {
          logger.warn(`Early Break: ${configId}`);
          break;
        }
        // Update the API endpoint for the next request
        previousEndpoint = config.endpointName;
        config.endpointName = result.next;
      } while (result?.moreResultsAvailable && result.moreResultsAvailable > 0);

      // Mark the ingestion process as complete for this configId
      this.releaseIngestionLock(configId);
      logger.info(
        `Data ingestion completed successfully for configId: ${configId} after ${count} loops`
      );
    } catch (error: any) {
      this.releaseIngestionLock(configId); // Release the lock on error
      logger.error("Error during background data ingestion:", {
        message: error.message,
        stack: error.stack,
      });
    }
  }
}
