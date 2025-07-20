import mongoose from 'mongoose';
import 'dotenv/config';

const connectDB = async () => {
    if (mongoose.connection.readyState === 1) {
        console.log('MongoDB connection already established.');
        return;
    }

    try {
        const mongoURI = process.env.MONGODB_URI;
        if (!mongoURI) {
            console.error(
                'FATAL ERROR: MONGODB_URI is not defined in .env file.'
            );
            process.exit(1);
        }

        console.log('Connecting to MongoDB...');
        await mongoose.connect(mongoURI);

        console.log('MongoDB Connected...');
    } catch (err) {
        console.error(err.message);
        process.exit(1);
    }
};

const disconnectDB = async () => {
    if (mongoose.connection.readyState === 0) {
        console.log('MongoDB connection already closed.');
        return;
    }

    try {
        console.log('Disconnecting from MongoDB...');
        await mongoose.disconnect();
        console.log('MongoDB Disconnected...');
    } catch (err) {
        console.error('Error disconnecting from MongoDB:', err.message);
    }
};

export { connectDB, disconnectDB };
