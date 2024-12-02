import { promises as fs } from "fs";
import { Message } from "./types";

let data: Message[] = [];
const path = "./messages";

const fileDb = {
  async init() {
    try {
      const files = await fs.readdir(path);
      files.forEach(async (file) => {
        const message = await fs.readFile(path + '/' + file);
        const response: Message = JSON.parse(message.toString());
        data.push(response);
      });
    } catch (e) {
      console.error(e);
    }
  },

  async getItems() {
    return data.slice(-5);
  },

  async addItem(item: Message) {
    const dateTime = new Date().toISOString();
    const message = { ...item, dateTime };
    data.push(message);
    const fileName = `${path}/${dateTime}.txt`;
    await fs.writeFile(fileName, JSON.stringify(message));
    return message;
  },
};

export default fileDb;
