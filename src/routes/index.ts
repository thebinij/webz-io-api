import { Router } from "express";

import { ApiConfigController } from "@controllers/apiConfig.controller";
import { ApiConfigService } from "@services/apiConfig.service";

import { DataIngestionController } from "@controllers/dataIngestion.controller";
import { DataIngestionService } from "@services/dataIngestion.service";
import { RestApiBuilder } from "@lib/restApiBuilder";

const router = Router();

// Initialize services and controllers
// TODO: Consider migrating to framework like (NestJS) if DI becomes too complex.
const apiCaller = new RestApiBuilder();
const apiConfigController = new ApiConfigController(new ApiConfigService());
const dataIngestionController = new DataIngestionController(
  new DataIngestionService(apiCaller)
);

// TODO: Add validation middleware before controller functions

// Route for ingesting data by APIConfig ID
router.post("/ingest-data/:configId", (req, res) =>
  dataIngestionController.ingestDataByConfigId(req, res)
);

// API Config routes
router.post("/api-configs", (req, res) =>
  apiConfigController.createAPIConfig(req, res)
);
router.get("/api-configs", (req, res) =>
  apiConfigController.getAllAPIConfigs(req, res)
);
router.get("/api-configs/:id", (req, res) =>
  apiConfigController.getAPIConfigById(req, res)
);
router.put("/api-configs/:id", (req, res) =>
  apiConfigController.updateAPIConfigById(req, res)
);
router.delete("/api-configs/:id", (req, res) =>
  apiConfigController.deleteAPIConfigById(req, res)
);

export default router;
