import foodModel from "../models/foodmodel.js";
import fs from "fs"; //import file sytem from fs which is already prebuild in the nodejs

// add food
// it is a controller function and we will create route using that function in our route file
const addFood = async (req, res) => {
  try {
    let image_filename = `${req.file.filename}`;

    const food = new foodModel({
      name: req.body.name,
      description: req.body.description,
      price: req.body.price,
      category: req.body.category,
      image: image_filename,
    });
        // if the product is save 
    await food.save();
    res.json({ success: true, message: "Food Added" });

  } 
//    else we get error 
catch (error) {
    console.log(error);
    res.json({ success: false, message: "Error" });
  }
};

// all food list
const listFood = async (req, res) => {
    try {
        const foods = await foodModel.find({})//in foods we get data of the food item  
        res.json({ success: true, data: foods})
    }
     catch (error) {
        console.log(error);
        res.json({ success: false, message: "Error" })
    }

}
const removeFood = async (req, res) => {
    try {

        const food = await foodModel.findById(req.body.id);//find the food item you want to delete [id has been created automa by Mongo DB]
        fs.unlink(`upload/${food.image}`, () => { })

        await foodModel.findByIdAndDelete(req.body.id)
        res.json({ success: true, message: "Food Removed" })

    } catch (error) {
        console.log(error);
        res.json({ success: false, message: "Error" })
    }

}
export { addFood ,listFood,removeFood};
