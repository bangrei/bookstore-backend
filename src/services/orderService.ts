import { Request, Response } from "express";
import orderRepo from "../repositories/orderRepo";
import userRepo from "../repositories/userRepo";
import { Order } from "../entity/Order";
import { User } from "../entity/User";
import { OrderItem } from "../entity/OrderItem";

export const getOrders = async (req: Request) => {
  const { page, limit, customerId } = req.query;
  const orders = await orderRepo.findAll(+page, +limit, +customerId);
  return orders;
};

export const findOrder = async (id: number) => {
  const order = await orderRepo.findById(id);
  return order;
};

export const checkout = async (user: User, order: Order) => {
	await orderRepo.save(order);
	// order.items.map((item:any) => {
	// 	const book = item.book;
	// 	item.order = order;
	// 	item.point = book.point;
	// 	return item;
	// });
	// const items = order.items as OrderItem[];
	// await orderRepo.saveItems(items);
  await userRepo.save(user);
  return order;
};

export const cancel = async (id: number) => {
  const order = await orderRepo.cancel(id);
  return order;
};
