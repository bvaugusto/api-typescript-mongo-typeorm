import { config } from "dotenv";
config();
import { createConnection } from "typeorm";
import bodyParser from "body-parser";
import express, { NextFunction, Request, Response } from "express";
import swaggerUi from "swagger-ui-express";
import YAML from "yamljs";
import monitor from "express-status-monitor";
import cors from "cors";
import "reflect-metadata";

try {
  (async () => {
    try {
      await createConnection();
      
      require("./dependencias");
      const app = express();
      app.use(monitor());
      app.use(cors());

      const swaggerDocument = YAML.load("./api-spec.yaml");
      app.use("/docs", swaggerUi.serve, swaggerUi.setup(swaggerDocument));

      app.use(bodyParser.json({ limit: "5mb" }));

      const swaggerRoutes = require("swagger-routes");
      swaggerRoutes(app, {
        api: "./api-spec.yaml",
        handlers: {
          path: "./build/src/endpoints",
          generate: false,
          group: false,
        },
      });

      app.use(
        (
          error: Error,
          req: Request,
          res: Response,
          next: NextFunction
        ): void => {
          if (error && (error as any).statusCode) {
            res
              .status((error as any).statusCode)
              .json({ error: error.message });
          } else if (error) {
            res.status(500).json({ error: error.message });
          } else {
            next(error);
          }
        }
      );

      app.listen(8000);

      // tslint:disable-next-line: no-console
      console.log("Running ...");
    } catch (error) {
      // tslint:disable-next-line: no-console
      console.error("Fatal error: ", error);
    }
  })();
} catch (e) {
  console.log(e);
}
