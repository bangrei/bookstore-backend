import { Entity, PrimaryGeneratedColumn, Column, OneToOne, OneToMany } from "typeorm";
import { OrderItem } from "./OrderItem";

@Entity({ name: "books" })
export class Book {
  @PrimaryGeneratedColumn()
  public id: number;

  @Column({ nullable: false })
  public title: string;

  @Column({ nullable: false })
  public writer: string;

  @Column({ nullable: true })
  public image: string;

  @Column({ nullable: false })
  public point: number;

  @Column({ nullable: true })
  public tags: string;

  @OneToMany(() => OrderItem, item => item.book)
  public orderItem: OrderItem[];
}
