import { Request, Response } from "express";
import { getOrders, checkout, cancel } from "../services/orderService";
import { findUser } from '../services/userService';
import { OrderItem } from "../entity/OrderItem";
import { Order } from "../entity/Order";

const createOrder = async (req: Request, res: Response) => {
  try {
    const { customerId, items, totalQty, points } = req.body;
    const customer = await findUser(customerId);
    if (customerId && customer.points < points) {
      return res.json({
        success: false,
        error: "Insufficient points",
      });
    }
		const corder = new Order();
		corder.user = customer;
		corder.canceled = 0;
    corder.items = items as OrderItem[];
    corder.total = points;
    corder.qty = totalQty;
		if (customerId) customer.points -= points;
		console.log(customer, customerId);
		
    const order = await checkout(
			customer,
			corder,
    );
    res.json({
      success: true,
      order: corder,
    });
  } catch (error) {
    res.json({
      success: false,
      error: error,
    });
  }
};

const retrieveOrders = async (req: Request, res: Response) => {
  try {
    const orders = await getOrders(req);
    res.json({
      success: true,
      orders: orders,
    });
  } catch (error) {
    res.json({
      success: false,
      error: error,
    });
  }
};

const cancelOrder = async (req: Request, res: Response) => {
  try {
    const { id } = req.query;
    const orderId: number = +id;
    await cancel(orderId);
    res.json({
      success: true
    });
  } catch (error) {
    res.json({
      success: false,
      error: error,
    });
  }
};

export default { createOrder, retrieveOrders, cancelOrder };
