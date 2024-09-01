import mongoose from "mongoose";
//create schmea for user authenication
const userSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    // unique matlab same email id dobara use nhi hogi
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    // here we will manage users  cart
    cartData: { type: Object, default: {} },
  },
  { minimize: false }
);

const userModel = mongoose.models.user || mongoose.model("user", userSchema);
export default userModel;
