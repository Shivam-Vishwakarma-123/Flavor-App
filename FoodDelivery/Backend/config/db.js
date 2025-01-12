// logic to connect with database
import mongoose from "mongoose";
// export const connectDB=async()=>{
//     await mongoose.connect('mongodb+srv://Shivam:MongoDB@cluster0.v43bs.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0').then(()=>console.log("DB Connected"));
// }
export const connectDB=async()=>{
    // await mongoose.connect('mongodb+srv://Shivam:MongoDB@cluster0.v43bs.mongodb.net/food').then(()=>console.log("DB Connected"));
    await mongoose.connect('mongodb+srv://Shivam:MongoDB%4018042002@cluster0.g8pab.mongodb.net/food').then(()=>console.log("DB Connected"));
}