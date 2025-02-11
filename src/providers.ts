import { ApiConfigController } from "@controllers/apiConfig.controller";
import { ApiConfigService } from "@services/apiConfig.service";
import { DataIngestionController } from "@controllers/dataIngestion.controller";
import { DataIngestionService } from "@services/dataIngestion.service";
import { RestApiBuilder } from "@lib/restApiBuilder";
import { httpRequest } from "@utils/httpHandler";

// Initialize services and controllers
// TODO: Consider migrating to framework like (NestJS) if DI becomes too complex.
const apiCaller = new RestApiBuilder(httpRequest);
const apiConfigController = new ApiConfigController(new ApiConfigService());
const dataIngestionController = new DataIngestionController(
  new DataIngestionService(apiCaller)
);

export {
  apiConfigController,
  dataIngestionController,
};
