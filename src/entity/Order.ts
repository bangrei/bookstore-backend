import {
	Entity,
	PrimaryGeneratedColumn,
	Column,
	JoinTable,
	JoinColumn,
	OneToMany,
	OneToOne,
	ManyToOne,
} from "typeorm";
import { User } from "./User";
import { OrderItem } from "./OrderItem";

@Entity({ name: "list_orders" })
export class Order {
  @PrimaryGeneratedColumn()
  public id: number;

  @Column({ nullable: true })
  public canceled: number;

	@ManyToOne(() => User, (entity) => entity.order, { onDelete: "SET NULL", eager: true })
  @JoinColumn()
  public user: User;

  @OneToMany(() => OrderItem, (item) => item.order, {eager: true})
  @JoinColumn()
  public items: OrderItem[];

  @Column({ nullable: false })
  public qty: number;

  @Column({ nullable: true })
  public total: number;
}
