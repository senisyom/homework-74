import { promises as fs } from "fs";
import { Message } from "./types";
import crypto from "crypto";

const fileName = "./db.json";
let data: Message[] = [];

const fileDb = {
  async init() {
    try {
      const fileContent = await fs.readFile(fileName);
      data = await JSON.parse(fileContent.toString());
    } catch (e) {
      console.error(e);
    }
  },

  async getItems() {
    return data;
  },

  async addItem(item: Message) {
    const dateTime = new Date().toISOString();
    const message = { dateTime, ...item };
    data.push(message);
    await this.save();
    return message;
  },

  async save() {
    return fs.writeFile(fileName, JSON.stringify(data));
  },
};

export default fileDb;
