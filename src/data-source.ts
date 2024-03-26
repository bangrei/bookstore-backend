import "reflect-metadata"
import { DataSource } from "typeorm"
import { Book } from "./entity/Book"
import * as dotenv from "dotenv";
import { User } from "./entity/User";
import { Order } from "./entity/Order";
import { OrderItem } from "./entity/OrderItem";
dotenv.config();

const { DB_URL } = process.env;

export const AppDataSource = new DataSource({
  type: "postgres",
  url: "postgres://laxrmted:6cf3y0i484lhAlskjMOQZ_WM8I2qFbgL@rosie.db.elephantsql.com/laxrmted",
  synchronize: true,
  logging: false,
  entities: [Book, User, Order, OrderItem],
  migrations: [__dirname + "/migration/*.ts"],
  subscribers: [],
});
