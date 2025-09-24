import mongoose from "mongoose";
const connectDB = async () => {
  try {
    await mongoose.connect(process.env.MONGODB_URI);
    console.log("SuccessFully connected to DataBase ✅");
  } catch (error) {
    console.log(`Error : ❌ ${error.message}`);
    process.exit(1);
  }
};
export default connectDB;
