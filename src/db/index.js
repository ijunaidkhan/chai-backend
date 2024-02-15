import mongoose from "mongoose";
import { DB_NAME } from "../constants.js";


// - Second(preferred) approach to connect to DB
const connectDB  = async () => {
    try{
        const connectionInstance = await mongoose.connect(`${process.env.MONGODB_URI}/${DB_NAME}`);
        console.log(`\n MongoDb connected! DB HOST: ${connectionInstance.connection.host}`);
    } catch(error) {
        console.log("Error", error);
        process.exit(1);
    }
}

export default connectDB;




//An immediately invoked function expression, or IIFE
// - First approach to connect to DB
/**
 (async () => {
  try {
    await mongoose.connect(`${process.env.MONGODB_URI}/${DB_NAME}`);
    app.on("error", (error) => {
      console.log("Error while connecting to Mongo");
      throw error;
    });

    app.listen(process.env.PORT, () => {
      console.log(`App is listening on ${process.env.PORT}`);
    });
  } catch (error) {
    console.log("Error", error);
    throw error;
  }
})();
 */