import { Request, Response } from "express";
import * as cache from "memory-cache";
import { AppDataSource } from "../data-source";
import { Order } from "../entity/Order.entity";

export class OrderController {
  static async getAllOrders(req: Request, res: Response) {
    const data = cache.get("data");
    if (data) {
      console.log("serving from cache");
      return res.status(200).json({
        data,
      });
    } else {
      console.log("serving from db");
      const orderRepository = AppDataSource.getRepository(Order);
      const orders = await orderRepository.find();
      cache.put("data", orders, 10000);
      return res.status(200).json({
        data: orders,
      });
    }
  }
  static async createOrder(req: Request, res: Response) {
    const { user_id, total_amount, payment_status, tracking_number } =
      req.body;
    const order = new Order();
    order.user_id = user_id;
    order.total_amount = total_amount;
    order.payment_status = payment_status;
    order.tracking_number = tracking_number;
    order.createdAt = new Date();
    order.updatedAt = new Date();

    const orderRepository = AppDataSource.getRepository(Order);
    await orderRepository.save(order);
    return res
      .status(200)
      .json({ message: "Order created successfully", order });
  }

  static async updateOrder(req: Request, res: Response) {
    const { order_id } = req.params;
    const { total_amount, payment_status, tracking_number } =
      req.body;
    const orderRepository = AppDataSource.getRepository(Order);
    const order = await orderRepository.findOne({
      where: { order_id },
    });
    order.total_amount = total_amount;
    order.payment_status = payment_status;
    order.tracking_number = tracking_number;
    order.updatedAt = new Date();
    await orderRepository.save(order);
    return res
      .status(200)
      .json({ message: "Order updated successfully", order });
  }

  static async deleteOrder(req: Request, res: Response) {
    const { order_id } = req.params;
    const orderRepository = AppDataSource.getRepository(Order);
    const order = await orderRepository.findOne({
      where: { order_id },
    });
    await orderRepository.remove(order);
    return res
      .status(200)
      .json({ message: "Order deleted successfully", order });
  }
}
