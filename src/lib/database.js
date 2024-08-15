import { mongoose } from "mongoose";

const connnectDB = async () => {
  try {
    const conn = await mongoose.connect(process.env.MONGODB_URI);
    console.log(
      `SUCCESS: Connected to MongoDB Database Successfully. ${conn.connection.host}`
    );
  } catch (error) {
    console.error(`ERROR: Failed to connect to MongoDB Database: ${error}`);
    process.exit(1);
  }
};

export default connnectDB;
