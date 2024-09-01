import express from "express"
import authMiddleware from "../middleware/auth.js"
import { placeOrder, userOrders, verifyOrder ,listOrders, updateStatus,placeOrderCod} from "../controller/orderController.js";


// creating router using express
const orderRouter = express.Router();
// creating endpoint 
orderRouter.post("/place",authMiddleware,placeOrder);
orderRouter.post("/verify",verifyOrder);
orderRouter.post("/userorder",authMiddleware,userOrders);
orderRouter.get("/list",listOrders);
orderRouter.post("/status",updateStatus);
orderRouter.post("/placecod",authMiddleware,placeOrderCod);
export default orderRouter;