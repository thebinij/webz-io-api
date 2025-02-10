import { Router } from "express";

import { DataIngestionController } from "@controllers/dataIngestion.controller";
import { DataIngestionService } from "@services/dataIngestion.service";
import { RestApiBuilder } from "@lib/restApiBuilder";

const router = Router();

// Initialize services and controllers
// TODO: Consider migrating to framework like (NestJS) if DI becomes too complex.
const apiCaller = new RestApiBuilder();
const dataIngestionController = new DataIngestionController(
  new DataIngestionService(apiCaller)
);

// TODO: Add validation middleware before controller functions

// Route for ingesting data by APIConfig ID
router.post("/ingest-data/:configId", (req, res) =>
  dataIngestionController.ingestDataByConfigId(req, res)
);


export default router;
