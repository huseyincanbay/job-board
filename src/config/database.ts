const mongoose = require('mongoose');

export const connectDB = async () => {
    try {
        const conn = await mongoose.connect(process.env.MONGO_PROD_URI, {
        });
        console.log(`MongoDB Connected: ${conn.connection.host}`);
    } catch (error) {
        console.error(error);
        process.exit(1);
    }
};
