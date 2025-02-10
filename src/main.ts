import "dotenv/config";
import express, { Response, Request } from "express";
import compression from "compression";
import helmet from "helmet";
import requestLogger from "@middlewares/winston";
import routes from "./routes";
import { connectToDatabase } from "@config/database";

const app = express();

app.use(express.urlencoded({ extended: true }));
app.use(helmet(), compression(), express.json());

// Request logger
app.use(requestLogger);

app.get("/", (_: Request, response: Response) => {
  return response.json({ message: "Hello World!" });
});

// Router
app.use("/v1", routes);

const port = process.env.PORT || 8001;
const host = (process.env as any).HOST || "0.0.0.0";

// listen to port
app.listen(port, async () => {
  await connectToDatabase();
  console.log(`🚀 Server ready at: http://${host}:${port}`);
});
