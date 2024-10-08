import React, { useContext } from "react";
import "./Cart.css";
import { StoreContext } from "../../Context/Context";
import { useNavigate } from "react-router-dom";
import { toast, ToastContainer } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';  // Import the CSS

const Cart = () => {
  const { cartItem, food_list, removeFromCart, subtotal, deliveryFee, total, url, token } = useContext(StoreContext); // Added token from context
  const navigate = useNavigate();

  // Function to display error toast
  const handleCheckout = () => {
    if (!token) {
      toast.error("Please sign in to place an order!", {
        position: "top-right",
        autoClose: 3000,
      });
    } else if (subtotal === 0) {
      toast.error("Please select an item!", {
        position: "top-right",
        autoClose: 3000,
      });
    } else {
      navigate("/order");
    }
  };

  return (
    <div className="cart">
      <ToastContainer /> {/* ToastContainer component to display the toast messages */}
      
      <div className="cart-items">
        <div className="cart-items-title">
          <p>Items</p>
          <p>Title</p>
          <p>Price</p>
          <p>Quantity</p>
          <p>Total</p>
          <p>Remove</p>
        </div>
        <br />
        <hr />
        {food_list.map((items) => {
          if (cartItem[items._id] > 0) {
            return (
              <React.Fragment key={items._id}>
                <div className="cart-items-title cart-items-item">
                  <img src={url + "/images/" + items.image} alt={items.name} />
                  <p>{items.name}</p>
                  <p>₹{items.price}</p>
                  <p>{cartItem[items._id]}</p>
                  <p>₹{items.price * cartItem[items._id]}</p>
                  <p
                    onClick={() => removeFromCart(items._id)}
                    className="cross"
                  >
                    x
                  </p>
                </div>
                <hr />
              </React.Fragment>
            );
          }
          return null;
        })}
      </div>
      <div className="cart-bottom">
        <div className="cart-total">
          <h2>Cart Totals</h2>
          <div className="cart-total-details">
            <div className="cart-total-values">
              <p>Subtotal</p>
              <p>Delivery Fee</p>
              <b>Total</b>
            </div>
            <div className="cart-total-values">
              <p>₹{subtotal}</p>
              <p>₹{subtotal === 0 ? 0 : deliveryFee}</p>
              <b>₹{subtotal === 0 ? 0 : total}</b>
            </div>
          </div>
          <button onClick={handleCheckout}>
            Proceed To Checkout
          </button>
        </div>
        <div className="cart-promocode">
          <p>If you have a promo code, enter it here:</p>
          <div className="cart-promocode-input">
            <input type="text" placeholder="Promo code" />
            <button>Submit</button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Cart;
