import orderModel from "../models/orderModel.js";
import userModel from "../models/userModel.js";
import Stripe from "stripe";
const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);
// placing user order from frontend 
const placeOrder = async (req, res) => {
 const frontend_URL="https://flavor-app-frontend.onrender.com/";
    try {
        const newOrder = new orderModel({
            userId: req.body.userId,
            items: req.body.items,
            amount: req.body.amount,
            address: req.body.address,
        })
        // save the order in database 
        await newOrder.save();
        // after order is placed empty card 
        await userModel.findByIdAndUpdate(req.body.userId, { cartData: {} });
        //   creating payment link 
        const line_items = req.body.items.map((item) => ({
            price_data: {
                currency: "inr",
                product_data: {
                    name: item.name
                },
                unit_amount: item.price * 100 
            },
            quantity: item.quantity
        }))
// pushing delivery charges 
        line_items.push({
            price_data: {
                currency: "inr",
                product_data: {
                    name: "Delivery Charge"
                },
                unit_amount:  20* 100
            },
            quantity: 1
        })
// session
        const session = await stripe.checkout.sessions.create({
            success_url: `${frontend_URL}/verify?success=true&orderId=${newOrder._id}`,
            cancel_url: `${frontend_URL}/verify?success=false&orderId=${newOrder._id}`,
            line_items: line_items,
            mode: 'payment',
        });

        res.json({ success: true, session_url: session.url });

    } catch (error) {
        console.log(error);
        res.json({ success: false, message: "Error" })
    }
}
// Placing User Order for Frontend using stripe
const placeOrderCod = async (req, res) => {

    try {
        const newOrder = new orderModel({
            userId: req.body.userId,
            items: req.body.items,
            amount: req.body.amount,
            address: req.body.address,
            payment: true,
        })
        await newOrder.save();
        await userModel.findByIdAndUpdate(req.body.userId, { cartData: {} });

        res.json({ success: true, message: "Order Placed" });

    } catch (error) {
        console.log(error);
        res.json({ success: false, message: "Error" })
    }
}

// Listing Order for Admin panel
const listOrders = async (req, res) => {
    try {
        const orders = await orderModel.find({});
        res.json({ success: true, data: orders })
    } catch (error) {
        console.log(error);
        res.json({ success: false, message: "Error" })
    }
}

// User Orders for Frontend
const userOrders = async (req, res) => {
    try {
        const orders = await orderModel.find({ userId: req.body.userId });
        res.json({ success: true, data: orders })
    } catch (error) {
        console.log(error);
        res.json({ success: false, message: "Error" })
    }
}

const updateStatus = async (req, res) => {
    console.log(req.body);
    try {
        await orderModel.findByIdAndUpdate(req.body.orderId, { status: req.body.status });
        res.json({ success: true, message: "Status Updated" })
    } catch (error) {
        res.json({ success: false, message: "Error" })
    }

}

const verifyOrder = async (req, res) => {
    const { orderId, success } = req.body;
    try {
        if (success === "true") {
            await orderModel.findByIdAndUpdate(orderId, { payment: true });
            res.json({ success: true, message: "Paid" })
        }
        else {
            await orderModel.findByIdAndDelete(orderId)
            res.json({ success: false, message: "Not Paid" })
        }
    } catch (error) {
        res.json({ success: false, message: "Not  Verified" })
    }

}
const deleteOrder = async (req, res) => {
    try {
      const { orderId } = req.body; // Ensure orderId is sent in the body
      if (!orderId) {
        return res.status(400).json({ success: false, message: "Order ID required" });
      }
  
      // Find the order by ID
      const order = await orderModel.findById(orderId);
  
      if (!order) {
        return res.status(404).json({ success: false, message: "Order not found" });
      }
  
      console.log("Order Status:", order.status); // Debugging log for status
  
      // Check if the order is delivered
      if (order.status !== "Delivered") {
        return res.status(400).json({
          success: false,
          message: `Order cannot be deleted. Current status: ${order.status}`,
        });
      }
  
      // Delete the order if it is delivered
      await orderModel.findByIdAndDelete(orderId);
      res.json({ success: true, message: "Order deleted successfully" });
  
    } catch (error) {
      console.error("Error deleting order:", error);
      res.status(500).json({ success: false, message: "Error deleting order" });
    }
  };
  
  

export { placeOrder, listOrders, userOrders, updateStatus, verifyOrder, placeOrderCod ,deleteOrder}