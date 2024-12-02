import { promises as fs } from "fs";
import { Message } from "./types";

let data: Message[] = [];
const path = "./messages";

const fileDb = {
  async init() {
    try {
      const files = await fs.readdir(path);
      files.forEach((file) => {
        const fileRead = async () => {
          const message = await fs.readFile(path + "/" + file);
          const response: Message = JSON.parse(message.toString());
          data.push(response);
        };
      });
    } catch (e) {
      console.error(e);
    }
  },

  async getItems() {
    return data;
  },

  async addItem(item: Message) {
    const dateTime = new Date().toISOString();

    await fs.writeFile(fileName, JSON.stringify(data));
    data.push(item);
  },
};

export default fileDb;
