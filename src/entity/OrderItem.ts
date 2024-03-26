import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  JoinColumn,
	JoinTable,
	OneToOne,
} from "typeorm";
import { Order } from "./Order";
import { Book } from "./Book";

@Entity({ name: "list_items" })
export class OrderItem {
  @PrimaryGeneratedColumn()
  public id: number;

	@ManyToOne(() => Order, (entity) => entity.items, { onDelete: "CASCADE" })
  public order: Order;

	// @ManyToOne(() => Book, (entity) => entity.orderItem, { onDelete: "SET NULL" })
	// @JoinColumn()
	// public book: Book;
	
	@Column('jsonb', {nullable: true})
	book: object;

  @Column({ nullable: false })
  public qty: number;

  @Column({ nullable: false })
  public point: number;
}
