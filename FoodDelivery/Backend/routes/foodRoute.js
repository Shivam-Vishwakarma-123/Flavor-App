import express from "express";
import { addFood,listFood,removeFood} from "../controller/foodController.js";
import multer from "multer";
// using multer we can create image storation system
// creating express router
const foodRouter = express.Router();

// here we will create logic so that image will saved in this upload folder
//+++++++++++++++++++++ Image storage engine +++++++++
const storage = multer.diskStorage({
    destination: 'upload',//destination folder name 
    filename: (req, file, cb) => {
        return cb(null,`${Date.now()}${file.originalname}`);//file ka unique name 
    }
})
const upload= multer({ storage: storage})

// we use post method to send the data on the server
foodRouter.post("/add",upload.single("image"), addFood)
foodRouter.get("/list",listFood)
foodRouter.post("/remove",removeFood);
// here ont his food router we have created post method /add endpoint where we have use this middle ware 
// to upload the image that we created using multer pakage inmulter we have used dsk storage confi
// food router is an instance of expres router object using this router we can create the
// get post and many other method



export default foodRouter;

