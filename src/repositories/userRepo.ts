import { AppDataSource } from "../data-source";
import { User } from "../entity/User";

const findAll = async (page = 1, limit = 10) => {
  const num = page <= 0 ? 1 : page;
  const skip = limit * num - limit;
  const repo = AppDataSource.getRepository(User);
  const users = await repo.find({
    take: limit,
    skip: skip,
  });
  return users;
};

const findById = async (id: number) => {
  const repo = AppDataSource.getRepository(User);
  const user = await repo.findOne({
    where: { id: id }
  });
  return user;
};

const findByEmail = async (email:string) => {
  const repo = AppDataSource.getRepository(User);
  const user = await repo.findOne({
    where: { email },
  });
  return user;
};

const save = async (user: User) => {
  const repo = AppDataSource.getRepository(User);
  const res = await repo.save(user);
  return res;
};

const remove = async (id: number) => {
  const repo = AppDataSource.getRepository(User);
  const user = await repo.findOne({
    where: { id: id },
  });
  const res = await repo.remove(user);
  return res;
};

export default {
  findAll,
  findById,
  save,
  remove,
  findByEmail,
};
