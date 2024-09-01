import mongoose from "mongoose";
// creating the schema
const foodSchema = new mongoose.Schema({
  name: { type: String, required: true },
  description: { type: String, required: true },
  price: { type: Number, required: true },
  image: { type: String, required: true },
  category: { type: String, required: true },
});
const foodModel = mongoose.models.food || mongoose.model("food", foodSchema);
export default foodModel;
// if this model will be there already there it will be used if not it will create new model
// foodmodel has been created
