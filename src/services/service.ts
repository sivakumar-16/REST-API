import bcrypt from "bcryptjs";
import { AppDataSource } from "../dbconfig";
import { Employee } from "../models/employe";

interface CreateEmpDb {
  name: string;
  email: string;
  password: string;
}

export const createEmploye = async ({ name, email, password }: CreateEmpDb) => {
  const userRepository = AppDataSource.getRepository(Employee);

  const existingUser = await userRepository.findOne({ where: { email } });
  if (existingUser) {
    throw new Error("Email already exists");
  }

  const hashedPassword = await bcrypt.hash(password, 10);

  const employe = userRepository.create({
    name,
    email,
    password: hashedPassword,
  });

  return userRepository.save(employe);
};

export const getAllemployes = async () => {
  const userRepository = AppDataSource.getRepository(Employee);
  return await userRepository.find();
};

export const getEmpById = async (empid: number) => {
  const userRepository = AppDataSource.getRepository(Employee);
  return await userRepository.findOneBy({ empid });
};

export const updateUser = async (
  empid: number,
  name?: string,
  email?: string,
  password?: string
) => {
  const userRepository = AppDataSource.getRepository(Employee);
  const employe = await userRepository.findOneBy({ empid });

  if (!employe) {
    return null;
  }

  if (name) employe.name = name;
  if (email) employe.email = email;
  if (password) employe.password = await bcrypt.hash(password, 10);

  await userRepository.save(employe);

  return employe;
};

export const deleteUser = async (empid: number) => {
  const userRepository = AppDataSource.getRepository(Employee);
  const employe = await userRepository.findOneBy({ empid });

  if (!employe) {
    return false;
  }

  await userRepository.remove(employe);

  return true;
};
