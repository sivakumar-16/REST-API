import express, { Request, Response } from "express";
import cors from "cors";
import { checkConnection } from "./dbconfig";
import route from "./routes/route";

const app = express();
app.use(cors());

const port = process.env.PORT;
app.use(express.json());

app.get("/", (req: Request, res: Response) => {
  return res.json({ message: "success" });
});

app.use("/user", route);

app.listen(port, () => {
  console.log("App running at ",`${port}`);
  checkConnection();
});
