import { AppDataSource } from "./data-source"
import * as express from "express";
import * as dotenv from "dotenv";
import apiRouter from "./routes/api";
import * as cors from "cors";

//import { Request, Response } from "express";
import "reflect-metadata";
//import seed from "./seed/bookSeed";
//import userSeed from './seed/userSeed';

const app = express.default();
app.use(express.json());
app.use(cors.default());

app.use("/api", apiRouter);
dotenv.config();

const { PORT = 5000 } = process.env;

app.get("/", (req, res) => {
  res.send(`PAGE NOT FOUND!!`);
});

AppDataSource.initialize()
  .then(async () => {
    // await seed.bookseed();
    // await userSeed.seed();
    app.listen(PORT, () => {
      console.log("Server is running on http://localhost:" + PORT);
    });
    console.log("Data Source has been initialized!");
  })
  .catch((error) => console.log(error));

export default app;
