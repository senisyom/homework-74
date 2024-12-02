import express from "express";
import fileDb from "../fileDb";
import { Message } from "../types";

const messageRouter = express.Router();

messageRouter.get("/messages", async (req, res) => {
  const messages = await fileDb.getItems();
  res.send(messages);
  res.send("All messages is here");
});

messageRouter.post("/", async (req, res) => {
  const message: Message = {
    message: req.body.message,
    dateTime: req.body.dateTime,
  };

  const savedMessage = await fileDb.addItem(message);
  res.send(savedMessage);

  console.log("Created and save message is here");
});

export default messageRouter;
