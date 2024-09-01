import express from "express";
import cors from "cors";
import { connect } from "mongoose";
import { connectDB } from "./config/db.js";
import foodRouter from "./routes/foodRoute.js";
import userRouter from "./routes/userRoute.js";
import cartRouter from "./routes/cartRoute.js";
import "dotenv/config";
import orderRouter from "./routes/orderRoute.js";
// app config
const app = express();
const port = 4000;
// middleware
app.use(express.json());
app.use(cors());
// Db connection
connectDB();
// api endpoints
// api endpoint for the foodRoute
// using thsi api we can add food item to database
app.use("/api/food", foodRouter);
app.use("/images", express.static("upload")); // we have mounted the upload folder at this end point
app.use("/api/user", userRouter);
app.use("/api/cart", cartRouter);

app.use("/api/order", orderRouter);

app.get("/", (req, res) => {
  res.send("Api Working ");
});
// run express server
app.listen(port, () => {
  console.log(`Server started on http://localhost:${port}`);
});
// mongodb+srv://Shivam:MongoDB@cluster0.v43bs.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0
