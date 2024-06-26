import { Request, Response } from "express";
import {
  createEmploye,
  deleteUser,
  getAllemployes,
  getEmpById,
  updateUser,
} from "../services/service";

export const createData = async (req: Request, res: Response) => {
  try {
    const { name, email, password } = req.body;

    if (
      !name ||
      typeof name !== "string" ||
      !password ||
      typeof password !== "string" ||
      !email ||
      typeof email !== "string" ||
      !/^[\w-.]+@([\w-]+\.)+[\w-]{2,4}$/.test(email)
    ) {
      return res.status(400).json({ message: "Invalid email" });
    }

    await createEmploye({ name, email, password });

    res.status(201).json({ message: "Employe created" });
  } catch (error) {
    console.error("Error creating user-email already exist:", error);
    return res
      .status(500)
      .json({ message: "Error creating user-email already exist", error });
  }
};

export const getData = async (req: Request, res: Response) => {
  try {
    const users = await getAllemployes();
    return res.status(200).json(users);
  } catch (error) {
    console.error("Error fetching users:", error);
    return res.status(500).json({ message: "Error fetching users", error });
  }
};

export const getDataById = async (req: Request, res: Response) => {
  try {
    const empid = parseInt(req.params.empid);
    if (isNaN(empid)) {
      return res.status(400).json({ message: "Invalid empid" });
    }

    const user = await getEmpById(empid);

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    return res.status(200).json(user);
  } catch (error) {
    console.error("Error fetching user:", error);
    return res.status(500).json({ message: "Error fetching user", error });
  }
};

export const updateData = async (req: Request, res: Response) => {
  try {
    const empid = parseInt(req.params.empid);
    if (isNaN(empid)) {
      return res.status(400).json({ message: "Invalid empid" });
    }

    const { name, email, password } = req.body;

    const updatedUser = await updateUser(empid, name, email, password);

    if (!updatedUser) {
      return res.status(404).json({ message: "User not found" });
    }

    return res.status(200).json({ message: "User updated successfully" });
  } catch (error) {
    console.error("Error updating user:", error);
    return res.status(500).json({ message: "Error updating user", error });
  }
};

export const deleteData = async (req: Request, res: Response) => {
  try {
    const empid = parseInt(req.params.empid);
    if (isNaN(empid)) {
      return res.status(400).json({ message: "Invalid empid" });
    }

    const user = await deleteUser(empid);

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    return res.status(200).json({ message: "User deleted successfully" });
  } catch (error) {
    console.error("Error deleting user:", error);
    return res.status(500).json({ message: "Error deleting user", error });
  }
};
