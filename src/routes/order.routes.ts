import * as express from "express";
import { authentication } from "../middleware/authentication";
import { OrderController } from "../controllers/order.controllers";
import { authorization } from "../middleware/authorization";

const Router = express.Router();

Router.get("/orders", authentication, OrderController.getAllOrders);
Router.post("/orders", authentication, OrderController.createOrder);

Router.put(
  "/orders/:id",
  authentication,
  authorization(["admin"]),
  OrderController.updateOrder
);

Router.delete(
  "/orders/:id",
  authentication,
  authorization(["admin"]),
  OrderController.deleteOrder
);
export { Router as orderRouter };
