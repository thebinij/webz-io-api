import { Router } from "express";

import { dataIngestionController, apiConfigController } from "providers";

const router = Router();

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
