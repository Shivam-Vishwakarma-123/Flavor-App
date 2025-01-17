import React, { useEffect, useState } from "react";
import "./Order.css";
import { toast } from "react-toastify";
import axios from "axios";
import { assets } from "../../assets/assets";
import { url } from "../../assets/assets";

const Order = () => {
  const [orders, setOrders] = useState([]);

  // Function to fetch all orders from the API
  const fetchAllOrders = async () => {
    try {
      console.log("Fetching orders...");
      const response = await axios.get(url + "/api/order/list");
      console.log("API Response:", response.data);

      if (response.data.success) {
        setOrders(response.data.data.reverse());
      } else {
        console.error("Error fetching orders:", response.data.message);
        toast.error("Error fetching orders");
      }
    } catch (error) {
      console.error("API Error:", error);
      toast.error("Error fetching orders");
    }
  };

  // Function to handle order status change
  const statusHandler = async (event, orderId) => {
    try {
      const response = await axios.post(url + "/api/order/status", {
        orderId,
        status: event.target.value,
      });
      console.log("Status Update Response:", response.data);

      if (response.data.success) {
        toast.success("Order status updated!");
        await fetchAllOrders();
      } else {
        toast.error("Failed to update status");
      }
    } catch (error) {
      console.error("Error updating status:", error);
      toast.error("Error updating order status");
    }
  };

  // Function to delete an order
  const deleteOrder = async (orderId) => {
    try {
      const response = await axios.delete(url + "/api/order/delete", {
        data: { orderId },
      });
      console.log("Delete Response:", response.data);

      if (response.data.success) {
        toast.success("Order deleted successfully!");
        await fetchAllOrders();
      } else {
        toast.error(response.data.message);
      }
    } catch (error) {
      console.error("Error deleting order:", error);
      toast.error("Error deleting order");
    }
  };

  // Fetch orders on component mount
  useEffect(() => {
    fetchAllOrders();
  }, []);

  // Log orders whenever the state changes
  useEffect(() => {
    console.log("Orders State Updated:", orders);
  }, [orders]);

  return (
    <div className="order add">
      <h3>Order Page</h3>
      <div className="order-list">
        {orders.length > 0 ? (
          orders.map((order, index) => (
            <div key={index} className="order-item">
              <img src={assets.parcel_icon} alt="Parcel Icon" />
              <div>
                <p className="order-item-food">
                  {order.items.map((item, idx) => {
                    return `${item.name} x ${item.quantity}${
                      idx === order.items.length - 1 ? "" : ", "
                    }`;
                  })}
                </p>
                <p className="order-item-name">
                  {order.address.firstName} {order.address.lastName}
                </p>
                <div className="order-item-address">
                  <p>{order.address.street},</p>
                  <p>
                    {order.address.city}, {order.address.state},{" "}
                    {order.address.country}, {order.address.zipcode}
                  </p>
                </div>
                <p className="order-item-phone">{order.address.phone}</p>
              </div>
              <p>Items: {order.items.length}</p>
              <p>₹{order.amount}</p>
              <select
                onChange={(e) => statusHandler(e, order._id)}
                value={order.status}
              >
                <option value="Food Processing">Food Processing</option>
                <option value="Out for delivery">Out for delivery</option>
                <option value="Delivered">Delivered</option>
              </select>
              <button
                className="delete-button"
                onClick={() => deleteOrder(order._id)}
              >
                X
              </button>
            </div>
          ))
        ) : (
          <p>No orders found</p>
        )}
      </div>
    </div>
  );
};

export default Order;
