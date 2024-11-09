const mongoose = require('mongoose');


//this is where we connect to the database
const connectDB = async () => {
    try {
        await mongoose.connect(process.env.MONGO_URI);
        console.log('Connected to MongoDB');
    } catch (error) {
        console.error('Database connection failed:', error);
        process.exit(1);  // Exit the process on failure
    }
};

module.exports = connectDB