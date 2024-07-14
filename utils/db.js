import mongoose from "mongoose";
const databaseConnection = async () => {
  try {
    console.log(process.env.MONGODB_URL);
     await mongoose.connect(`${process.env.MONGODB_URL}/twitter_backend`);
  } catch (error) {
    console.log(`Mongoose database connection error - : ${error}`);
    throw error;
  }
};
export default databaseConnection