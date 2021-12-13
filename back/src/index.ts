import express, { Request, Response } from "express";

const PORT: Number = 3001;
const app = express();

app.get("/", (req: Request, res: Response) => {
  res.send("hello Express again...");
});

app.listen(PORT, () => {
  console.log("server open");
});
