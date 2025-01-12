import React, { createContext, useEffect, useState } from "react";
// import { food_list } from "../assets/assets";
import axios from "axios";
// Create the context
export const StoreContext = createContext(null);

const StoreContextProvider = (props) => {
  const [cartItem, setCartItems] = useState({});
  // const url = "http://localhost:4000";
  const url = "https://flavor-app.onrender.com";
  const [token, setToken] = useState("");
  // getting fooditem from the database
  const [food_list, setFoodList] = useState([]);
  const addToCart = async (itemId) => {
    if (!cartItem[itemId]) {
      setCartItems((prev) => ({ ...prev, [itemId]: 1 }));
    } else {
      setCartItems((prev) => ({ ...prev, [itemId]: prev[itemId] + 1 }));
    }
    // integrating api with fronted
    if (token) {
      await axios.post(
        url + "/api/cart/add",
        { itemId },
        { headers: { token } }
      );
    }
  };

  const removeFromCart = async (itemId) => {
    setCartItems((prev) => ({ ...prev, [itemId]: prev[itemId] - 1 }));
    if (token) {
      await axios.post(
        url + "/api/cart/remove",
        { itemId },
        { headers: { token } }
      );
    }
  };

  const calculateSubtotal = () => {
    return food_list.reduce((acc, item) => {
      return acc + (cartItem[item._id] || 0) * item.price;
    }, 0);
  };

  const subtotal = calculateSubtotal();
  const deliveryFee = 20; // Assuming a flat delivery fee
  const total = subtotal + deliveryFee;

  const getTotalCartAmount = () => subtotal;
  // ye isliye laga rha ki jab refres ho to logout na ho paye
  // Function to fetch food list
  const fetchFoodList = async () => {
    // calling api
    const response = await axios.get(url + "/api/food/list");
    setFoodList(response.data.data);
  };
  // refres karne par cart ka data loaded rhe
  const loadCartData = async (token) => {
    const response = await axios.post(
      url + "/api/cart/get",
      {},
      { headers: token }
    );
    setCartItems(response.data.cartData);
  };
  // Ab jab bhi site refres ho tab chale to useeffect me daal diya

  useEffect(() => {
    async function loadData() {
      await fetchFoodList();
      if (localStorage.getItem("token")) {
        setToken(localStorage.getItem("token"));
        await loadCartData({ token: localStorage.getItem("token") });
      }
    }
    loadData();
  }, []);

  // Define the context value
  const contextValue = {
    food_list,
    cartItem,
    setCartItems,
    addToCart,
    removeFromCart,
    getTotalCartAmount,
    subtotal,
    deliveryFee,
    total,
    url,
    token,
    setToken,
  };

  return (
    <StoreContext.Provider value={contextValue}>
      {props.children}
    </StoreContext.Provider>
  );
};

export default StoreContextProvider;
