import React, { useContext, useState } from "react";
import "./LoginPopup.css";
import { assets } from "../../assets/assets";
import { StoreContext } from "../../Context/Context";
import axios from "axios";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const LoginPopup = ({ setShowLogin }) => {
  const { setToken } = useContext(StoreContext);
  const url = "https://flavor-app.onrender.com"; // Base API URL
  const [currentState, setCurrentState] = useState("Login");
  const [data, setData] = useState({
    name: "",
    email: "",
    password: "",
  });

  const onChangeHandler = (event) => {
    const { name, value } = event.target;
    setData((prevData) => ({ ...prevData, [name]: value }));
  };

  const onLogin = async (event) => {
    event.preventDefault();

    let apiUrl = url;
    if (currentState === "Login") {
      apiUrl += "/api/user/login";
    } else {
      apiUrl += "/api/user/register";
    }

    try {
      const response = await axios.post(apiUrl, data);

      if (response.data.success) {
        setToken(response.data.token);
        localStorage.setItem("token", response.data.token);
        setShowLogin(false); // Close the login popup
        toast.success(response.data.message || "Success!", {
          position: "top-center",
          autoClose: 3000,
        });
      } else {
        toast.error(response.data.message || "An error occurred.", {
          position: "top-center",
          autoClose: 3000,
        });
      }
    } catch (error) {
      console.error("API Error:", error);
      if (error.response) {
        toast.error(error.response.data.message || "Something went wrong!", {
          position: "top-center",
          autoClose: 3000,
        });
      } else {
        toast.error("Unable to connect to the server.", {
          position: "top-center",
          autoClose: 3000,
        });
      }
    }
  };

  return (
    <div className="login-popup">
      <ToastContainer />
      <form onSubmit={onLogin} className="login-popup-container">
        <div className="login-popup-title">
          <h2>{currentState}</h2>
          <img onClick={() => setShowLogin(false)} src={assets.cross_icon} alt="Close" />
        </div>
        <div className="login-popup-inputs">
          {currentState === "Sign Up" && (
            <input
              name="name"
              onChange={onChangeHandler}
              value={data.name}
              type="text"
              placeholder="Your Name"
              required
            />
          )}
          <input
            name="email"
            onChange={onChangeHandler}
            value={data.email}
            type="email"
            placeholder="Your Email"
            required
          />
          <input
            name="password"
            onChange={onChangeHandler}
            value={data.password}
            type="password"
            placeholder="Password"
            required
          />
        </div>
        <button type="submit">
          {currentState === "Sign Up" ? "Create Account" : "Login"}
        </button>
        <div className="login-popup-condition">
          <input type="checkbox" required />
          <p>By continuing, I agree to the terms and privacy policy</p>
        </div>
        {currentState === "Login" ? (
          <p>
            Create a new account?{" "}
            <span onClick={() => setCurrentState("Sign Up")}>Click here</span>
          </p>
        ) : (
          <p>
            Already have an account?{" "}
            <span onClick={() => setCurrentState("Login")}>Click here</span>
          </p>
        )}
      </form>
    </div>
  );
};

export default LoginPopup;
