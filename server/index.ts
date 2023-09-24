import express from "express";
import bodyParser from "body-parser";
import cors from "cors";
import { BaseController, MainController } from "./src";


(async () => {
  try {
    const app = express();
    require('dotenv').config();

    app.use(cors());
    
    const port = process.env.PORT;

    app.use(bodyParser.urlencoded({ extended: false }));
    app.use(bodyParser.json());

    // init controller
    const controllers: BaseController[] = [new MainController()];

    controllers.forEach((controller) => controller.registerRoutes(app));

    app.listen(port, () => console.log(`App listening on the port ${port}`));
  } catch (err) {
    console.log("Error on bootstrapping the application: %O", err);
  }
})();