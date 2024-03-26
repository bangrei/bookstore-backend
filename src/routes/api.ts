import * as express from "express";
const router = express.Router();

import bookController from "../controllers/bookController";
import orderController from "../controllers/orderController";
import userController from "../controllers/userController";

router.get("/users", userController.getList);
router.post("/login", userController.logIn);
router.post("/signup", userController.signup);

router.get("/books", bookController.getAllBooks);
router.post("/book", bookController.createBook);

router.get("/orders", orderController.retrieveOrders);
router.post("/order", orderController.createOrder);
router.put("/order/cancel", orderController.cancelOrder);

export default router;
