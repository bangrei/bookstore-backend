import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from "typeorm"
import { Order } from "./Order";

@Entity({ name: "users" })
export class User {
  @PrimaryGeneratedColumn()
  public id: number;

  @Column({ nullable: false })
  public firstName: string;

  @Column({ nullable: true })
  public lastName: string;

  @Column({ nullable: false })
  public email: string;

  @Column({ nullable: false })
  public password: string;

  @Column({ nullable: true })
  public points: number;

  @OneToMany(() => Order, entity => entity.user)
  order: Order[]
}
