import express from "express";
import fs from "fs";
import messageRouter from "./routers/messages";
import fileName from "./fileDb";

const app = express();
const port = 8000;

app.use(express.json());

app.use("/message", messageRouter);

const path = "./messages";

const run = async () => {
  await fileName.init();
  app.listen(port, () => {
    console.log(`Server started on port http://localhost:${port}`);
  });
};

run().catch((err) => console.log(err));
