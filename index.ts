import express from "express";
import fs from "fs";
import fileDb from "./fileDb";
import messageRouter from "./routers/messages";

const app = express();
const port = 8000;

app.use(express.json());

app.use("/message", messageRouter);

const run = async () => {
  if (fs.existsSync("./db.json")) {
    await fileDb.init();
  } else {
    fs.writeFileSync("./db.json", JSON.stringify([]));
  }
};

app.listen(port, () => {
  console.log(`Server started on port http://localhost:${port}`);
});

run().catch((err) => console.log(err));
