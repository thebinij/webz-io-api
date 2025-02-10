import { APIConfig } from "@interfaces/api.interface";
import { RestApiBuilder } from "@lib/restApiBuilder";
import { PostModel } from "@models/postModel";

export class DataIngestionService {
  constructor(private apiCaller: RestApiBuilder) {}

  public async fetchData(config: APIConfig, payload: any) {
    const queryParams = payload.queryParams || {};
    const queryString = new URLSearchParams(queryParams).toString();

    config.endpointName = queryString
      ? `${config.endpointName}&${queryString}`
      : `${config.endpointName}&q=Bitcoin`;

    const headers = this.apiCaller.generateRequestHeaders(config);
    const body = await this.apiCaller.generateRequestBody(config);

    return this.apiCaller.execute(config, headers, body);
  }

  public async insertBatchData(batch: any) {
    try {
     // bulkCreate inserts an array of objects in one call.
    // The "ignoreDuplicates" option will skip any posts with an existing primary key (uuid).
       await PostModel.bulkCreate(batch, { ignoreDuplicates: true });
    } catch (error) {
      console.error("Error inserting data into database:", error);
      throw new Error("Database insert failed");
    }
  }
}
