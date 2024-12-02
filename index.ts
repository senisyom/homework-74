import express from "express";
import fs from "fs";
import messageRouter from "./routers/messages";
import fileName from "./fileDb";

const app = express();
const port = 8000;

app.use(express.json());

app.use("/message", messageRouter);

const run = async () => {
  if (fs.existsSync("./messages")) {
    await fileName.init();
  } else {
    fs.writeFileSync("./messages", JSON.stringify('./:messages'));
  }
};

app.listen(port, () => {
  console.log(`Server started on port http://localhost:${port}`);
});

run().catch((err) => console.log(err));
