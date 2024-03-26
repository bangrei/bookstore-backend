import { AppDataSource } from "../data-source";
import { Order } from "../entity/Order";
import { OrderItem } from "../entity/OrderItem";

const findAll = async (page = 1, limit = 10, customerId = null) => {
  const num = page <= 0 ? 1 : page;
  const skip = limit * num - limit;
  const repo = AppDataSource.getRepository(Order);
  let options = {
    take: limit,
    skip: skip
  };
  if (customerId) {
    options = {
      ...options,
      ...{
        where: { user: { id: customerId } },
      },
    };
  }
  const orders = await repo.find(options);
  return orders;
};

const findById = async (id: number) => {
  const repo = AppDataSource.getRepository(Order);
  const order = await repo.findOne({
    where: { id: id },
  });
  return order;
};

const save = async (order: Order) => {
	const repo = AppDataSource.getRepository(Order);
  const res = await repo.save(order);
  return res;
};

const saveItem = async (item: OrderItem) => {
  const repo = AppDataSource.getRepository(OrderItem);
  const res = await repo.save(item);
  return res;
};
const saveItems = async (items: OrderItem[]) => {
  const repo = AppDataSource.getRepository(OrderItem);
  const res = await repo.save(items);
  return res;
};

const cancel = async (orderId: number) => {
  const repo = AppDataSource.getRepository(Order);
  const order = await repo.update(orderId, { canceled: 1 });
  return order;
};

export default {
  findAll,
  findById,
	save,
	saveItem,
	saveItems,
  cancel,
};
