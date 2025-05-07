// db.js (ESM version)
import { MongoSequelize } from "sequelize-mongodb";
dotenv.config(); 
import dotenv, { configDotenv } from "dotenv";


const sequelize = new MongoSequelize(process.env.MONGO_URI);  

const connectDB = async () => {
    try {
        await sequelize.authenticate();
        console.log("Connected to MongoDB successfully");
    } catch (error) {
        console.error("Error connecting to MongoDB:", error);
    }
};

export { sequelize, connectDB };

