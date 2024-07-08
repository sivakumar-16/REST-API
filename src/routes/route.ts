import { Router } from "express";
import {
  getData,
  createData,
  getDataById,
  updateData,
  deleteData,
} from "../controller/controller";

const route = Router();

route.post("/signup", createData);
route.get("/getdata", getData);
route.get("/getone/:empid", getDataById);
route.put("/update/:empid", updateData);
route.delete("/delete/:empid", deleteData);

export default route;
