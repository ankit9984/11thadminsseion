import mongoose from "mongoose";
import config from "./config.js";

const connetDB = async () => {
    try {
        await mongoose.connect(config.mongoURI)
        .then(() => console.log('Database connect successfully'))
    } catch (error) {
        console.log('Database connect lost', error);
    }
};

export default connetDB;