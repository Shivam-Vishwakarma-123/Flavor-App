import userModel from "../models/userModel.js";
import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";
import validator from "validator";
//create token
const createToken = (id) => {
  return jwt.sign({ id }, process.env.JWT_SECRET);
};

// login user
// api so that our registered user can login
const loginUser = async (req, res) => {
  // taking email password from req .body
  const { email, password } = req.body;
  try {
    const user = await userModel.findOne({ email });

    if (!user) {
      return res.json({ success: false, message: "Something Went Wrong!" });
    }
    // if user is available match the user password with the stored passwordi.e user password

    const isMatch = await bcrypt.compare(password, user.password);

    if (!isMatch) {
      return res.json({ success: false, message: "Invalid credentials" });
    }

    const token = createToken(user._id);
    res.json({ success: true, token });
  } catch (error) {
    console.log(error);
    res.json({ success: false, message: "Error" });
  }
};
// crated the register user api
//register user
const registerUser = async (req, res) => {
  // Destructing the name email password from the request body
  const { name, email, password } = req.body;
  try {
    //check if user already exist
    // finding the user having already account
    const exists = await userModel.findOne({ email });
    if (exists) {
      return res.json({ success: false, message: "User already exists" });
    }

    // validating email format & strong password
    if (!validator.isEmail(email)) {
      return res.json({
        success: false,
        message: "Please enter a valid email",
      });
    }
    if (password.length < 8) {
      return res.json({
        success: false,
        message: "Please enter a strong password",
      });
    }
    // encrypting user password
    // hashing user password
    const salt = await bcrypt.genSalt(10); // the more no. round the more time it will take
    const hashedPassword = await bcrypt.hash(password, salt);
    // hamne usermodel name email password banaya tha schema me
    const newUser = new userModel({ name, email, password: hashedPassword });
    // saving user in database
    const user = await newUser.save();
    const token = createToken(user._id);
    res.json({ success: true, token });
  } catch (error) {
    console.log(error);
    res.json({ success: false, message: "Error" });
  }
};
// exporting object
export { loginUser, registerUser };
