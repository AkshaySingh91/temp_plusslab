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
            ssl: true,
            tls: true,
            tlsAllowInvalidCertificates: false,
            retryWrites: true,
            w: "majority",
            maxPoolSize: 10,
            serverSelectionTimeoutMS: 5000,
            socketTimeoutMS: 45000,
        });

        console.log(`\nMongoDB connected! DB HOST: ${connectionInstance.connection.host}`);
    } catch (error) {
        console.error("MongoDB connection error:", error);
        process.exit(1);
    }
};

export default connectDB;
