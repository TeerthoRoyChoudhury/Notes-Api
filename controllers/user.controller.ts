import { Request, Response } from "express";
import { userData, signin } from "../validation/bun.validator";
import { ifExist, addUser } from "../services/user.services";
import { hashPassword, verifyPassword } from "../utils/password";
import { generateToken } from "../utils/jwt";

export const userSignup = async (
  req: Request,
  res: Response,
): Promise<void> => {
  const result = await userData.safeParseAsync(req.body);
  if (!result.success) {
    res.json(400).json({ error: result.error.cause });
    return;
  }
  const { name, email, password } = result.data;
  const check = await ifExist(email);
  if (check) {
    res.status(400).json({ error: `User with ${email} already exists` });
    return;
  }
  const privPassword = await hashPassword(password);
  const newUser = await addUser(name, email, privPassword);

  res.status(200).json({ status: "Success", userId: newUser?.UserId });
  return;
};

export const userSignin = async (
  req: Request,
  res: Response,
): Promise<void> => {
  const result = await signin.safeParseAsync(req.body);
  if (!result.success) {
    res.status(400).json({ error: result.error.issues });
    return;
  }
  const { email, password } = result.data;
  const check = await ifExist(email);
  if (!check) {
    res.status(400).json({ error: `You have to signup first` });
    return;
  }
  const savedPassword = check!.password;
  const isUser = await verifyPassword(savedPassword, password);
  if (!isUser) {
    res.status(404).json({ error: "Invalid password" });
    return;
  }

  const Payload = {
    sub: check.id,
  };
  const token = generateToken(Payload);
  res.status(200).json({ message: "Loggin successfull", token });
  return;
};
