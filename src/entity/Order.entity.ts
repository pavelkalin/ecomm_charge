import {
  Column,
  CreateDateColumn,
  Entity,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from "typeorm";

@Entity({ name: "orders" })
export class Order {
  @PrimaryGeneratedColumn("uuid")
  order_id: string;

  @Column({ nullable: false })
  user_id: string;

  @Column({ nullable: false })
  total_amount: number;

  @Column({ nullable: false })
  payment_status: string;

  @Column({ nullable: false })
  tracking_number: string;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;
}
