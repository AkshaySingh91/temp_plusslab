import mongoose from "mongoose";
import { DB_NAME } from "../constants.js";

const connectDB = async () => {
    try {
        if (!process.env.MONGO_URI) {
            console.error("Missing MONGO_URI in environment variables");
            process.exit(1);
        }

        const connectionInstance = await mongoose.connect(process.env.MONGO_URI, {
            dbName: DB_NAME,
            // Add these options for MongoDB Atlas
            useNewUrlParser: true,
            useUnifiedTopology: true,
            retryWrites: true,
            w: "majority"
        });

        console.log(`\nMongoDB connected! DB HOST: ${connectionInstance.connection.host}`);
    } catch (error) {
        console.error("MongoDB connection error:", error);
        process.exit(1);
    }
};

export default connectDB;
