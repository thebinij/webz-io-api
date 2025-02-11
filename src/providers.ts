import { ApiConfigController } from "@controllers/apiConfig.controller";
import { ApiConfigService } from "@services/apiConfig.service";
import { DataIngestionController } from "@controllers/dataIngestion.controller";
import { DataIngestionService } from "@services/dataIngestion.service";
import { RestApiBuilder } from "@lib/restApiBuilder";
import { httpRequest } from "@utils/httpHandler";
import { DataIngestionRepository } from "repositories/dataIngestion.repository";

// Initialize services and controllers
// TODO: Consider migrating to framework like (NestJS) if DI becomes too complex.
const apiCaller = new RestApiBuilder(httpRequest);
const apiConfigController = new ApiConfigController(new ApiConfigService());
const dataIngestionService = new DataIngestionService(
  apiCaller,
  new DataIngestionRepository()
);
const dataIngestionController = new DataIngestionController(
  dataIngestionService
);

export { apiConfigController, dataIngestionController };
