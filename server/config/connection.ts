import mongoose from 'mongoose';

mongoose.set("strictQuery", false);

const MONGODB_URI = process.env.MONGODB_URI || 'mongodb://127.0.0.1:27017/THG';

const db = async (): Promise<void> => {
    try {
        const options = {
            useNewUrlParser: true,
            useUnifiedTopology: true,
        } as any;
        await mongoose.connect(MONGODB_URI, options);
        console.log('Connected to MongoDB');
    } catch (error) {
        console.error('MongoDB connection error:', error)
    }
};

export default db;


