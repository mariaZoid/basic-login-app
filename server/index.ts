import express from "express";
import bodyParser from "body-parser";
import cors from "cors";

(async () => {
  try {
    const app = express();
    // setup config
    require('dotenv').config();

    app.use(cors());
    
    const port = process.env.PORT;

    app.use(bodyParser.urlencoded({ extended: false }));
    app.use(bodyParser.json());

    app.listen(port, () => console.log(`App listening on the port ${port}`));
  } catch (err) {
    console.log("Error on bootstrapping the application: %O", err);
  }
})();