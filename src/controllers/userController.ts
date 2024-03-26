import { Request, Response } from "express";
import { encrypt } from "../services/helper";
import * as cache from "memory-cache";

import { findUser, getUsers, saveUser, findUserByEmail } from "../services/userService";

const signup = async (req: Request, res: Response) => {
  try {
    const { firstName, lastName, email, password } = req.body;
    const encryptedPassword = await encrypt.encryptpass(password);
    const points = 100;
    const user = await saveUser(
      null,
      firstName,
      lastName,
      email,
      encryptedPassword,
      points
    );
    res.json({
      success: true,
      user: user,
    });
  } catch (error) {
    res.json({
      success: false,
      error: error,
    });
  }
};
const getList = async (req: Request, res: Response) => {
  try {
    const data = cache.get("users");
    if (data) {
      return res.status(200).json({
        success: true,
        users: data,
      });
    }
    console.log(req.params);
    const users = await getUsers(req);
    res.json({
      success: true,
      users: users,
    });
  } catch (error) {
    res.json({
      success: false,
      error: error,
    });
  }
};
const getProfile = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const userId: number = +id;
    const user = await findUser(userId);
    res.json({
      success: true,
      user: user,
    });
  } catch (error) {
    res.json({
      success: false,
      error: error,
    });
  }
};
const updateUser = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const userId: number = +id;
    const { firstName, lastName, email, points } = req.body;
    const user = await saveUser(userId, firstName, lastName, email, "", points);
    res.json({ success: true, user: user });
  } catch (error) {
    res.json({
      success: false,
      error: error,
    });
  }
};
const logIn = async (req: Request, res: Response) => {
  try {
    const { email, password } = req.body;
    if (!email || !password) {
      return res.json({ message: " email and password required" });
    }
	const user = await findUserByEmail(email);
	const isPasswordValid = encrypt.comparepassword(user.password, password);
    if (!user || !isPasswordValid) return res.json({ message: "User not found" });
    res.json({
      success: true,
      user: user,
    });
  } catch (error) {
    res.json({
      success: false,
      error: error,
    });
  }
};
export default {
  signup,
  getList,
  getProfile,
  updateUser,
  logIn,
};
