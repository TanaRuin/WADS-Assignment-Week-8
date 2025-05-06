// db.js (ESM version)
import { MongoSequelize } from "sequelize-mongodb";
import dotenv from "dotenv";

dotenv.config();

const sequelize = new MongoSequelize(process.env.CONNECTION_URL);  

const connectDB = async () => {
    try {
        await sequelize.authenticate();
        console.log("Connected to MongoDB successfully");
    } catch (error) {
        console.error("Error connecting to MongoDB:", error);
    }
};

export { sequelize, connectDB };

