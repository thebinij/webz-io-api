import { Request, Response } from "express";
import { ApiConfigService } from "@services/apiConfig.service";
import logger from "@config/winston";

export class ApiConfigController {
  private apiConfigService: ApiConfigService;

  constructor(apiConfigService: ApiConfigService) {
    this.apiConfigService = apiConfigService;
  }

  async createAPIConfig(req: Request, res: Response) {
    try {
      // TODO: Validate request body
      const createdConfig = await this.apiConfigService.createConfig(req.body);

      res.status(201).json({
        message: "API Config created successfully",
        data: createdConfig,
      });
    } catch (error: any) {
      logger.error("Error creating API Config:", error);
      res.status(500).json({
        message: "Error creating API Config",
        error: error.message,
      });
    }
  }

  async getAllAPIConfigs(req: Request, res: Response) {
    try {
      const configs = await this.apiConfigService.getAllConfigs();

      res.status(200).json({
        message: "Fetched all API Configs successfully",
        data: configs,
      });
    } catch (error: any) {
      logger.error("Error fetching API Configs:", error);
      res.status(500).json({
        message: "Error fetching API Configs",
        error: error.message,
      });
    }
  }

  async getAPIConfigById(req: Request, res: Response) {
    try {
      const { id } = req.params;
      const config = await this.apiConfigService.getConfigById(id);

      res.status(200).json({
        message: "Fetched API Config successfully",
        data: config,
      });
    } catch (error: any) {
      logger.error("Error fetching API Config by ID:", error);
      res.status(500).json({
        message: "Error fetching API Config by ID",
        error: error.message,
      });
    }
  }

  async updateAPIConfigById(req: Request, res: Response) {
    try {
      const { id } = req.params;
      const updatedConfig = await this.apiConfigService.updateConfigById(
        id,
        req.body
      );

      res.status(200).json({
        message: "API Config updated successfully",
        data: updatedConfig,
      });
    } catch (error: any) {
      logger.error("Error updating API Config by ID:", error);
      res.status(500).json({
        message: "Error updating API Config by ID",
        error: error.message,
      });
    }
  }

  async deleteAPIConfigById(req: Request, res: Response) {
    try {
      const { id } = req.params;
      await this.apiConfigService.deleteConfigById(id);

      res.status(200).json({
        message: "API Config deleted successfully",
      });
    } catch (error: any) {
      logger.error("Error deleting API Config by ID:", error);
      res.status(500).json({
        message: "Error deleting API Config by ID",
        error: error.message,
      });
    }
  }
}
