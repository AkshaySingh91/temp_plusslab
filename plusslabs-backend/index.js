import mongoose from 'mongoose';
import dotenv from 'dotenv';
dotenv.config();
import connectDB from "./db/index.js";
import { app } from './app.js';
import Patient from './models/patient.models.js';
import testRoutes from "./routes/test.routes.js";
import patientRoutes from "./routes/patient.routes.js";

// Verify environment variables
const requiredEnvVars = [
  'MONGO_URI',
  'GOOGLE_CLIENT_ID',
  'GOOGLE_CLIENT_SECRET',
  'JWT_SECRET'
];

for (const envVar of requiredEnvVars) {
  if (!process.env[envVar]) {
    console.error(`Missing required environment variable: ${envVar}`);
    process.exit(1);
  }
}

app.use("/api/tests", testRoutes)
app.use("/api/patients", patientRoutes);

async function startServer() {
    try {
        await connectDB();
        console.log("✅ Database connected successfully!");

        const PORT = process.env.PORT || 3000;
        app.listen(PORT, () => {
            console.log(`🚀 Server is running on port ${PORT}`);
        });

    } catch (err) {
        console.error("❌ MongoDB connection failed:", err);
        process.exit(1); // Exit process if DB connection fails
    }
}

startServer();
