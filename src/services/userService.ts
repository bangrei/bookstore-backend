import { Request, Response } from "express";
import userRepo from "../repositories/userRepo";
import { User } from "../entity/User";

export const getUsers = async (req: Request) => {
  const { page, limit } = req.body;
  const users = await userRepo.findAll(page, limit);
  return users;
};

export const findUser = async (id: number) => {
  const user = await userRepo.findById(id);
  return user;
};

export const saveUser = async (
	id: number,
	firstName: string,
	lastName: string,
	email: string,
	password: string,
	points: number
) => {
	if (id) {
		const user = await userRepo.findById(id);
		user.firstName = firstName;
		user.lastName = lastName;
		user.email = email;
		user.points = points;
		await userRepo.save(user);
		return user;
	} else {
		const user = new User();
		user.firstName = firstName;
		user.lastName = lastName;
		user.email = email;
		user.password = password;
		user.points = points;
		await userRepo.save(user);
		return user;
	}
};

export const findUserByEmail = async (email: string) => {
	const user = await userRepo.findByEmail(email);
  	return user;
};
