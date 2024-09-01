import express from "express"
import { addToCart,removeFromCart,getCart } from "../controller/cartcontroller.js"
import authMiddleware from "../middleware/auth.js";
  // Ensure the path is correct

const cartRouter = express.Router();
// 3 api endpoints
cartRouter.post("/get",authMiddleware,getCart);
cartRouter.post("/add",authMiddleware,addToCart);
cartRouter.post("/remove",authMiddleware,removeFromCart);
export default cartRouter;