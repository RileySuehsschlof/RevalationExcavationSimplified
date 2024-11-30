const express = require('express');
const dotenv = require('dotenv');
const connectDB = require('./config/db');
const userRoutes = require('./routes/userRoutes');
const contactRoutes = require('./routes/contactRoutes');
const cors = require('cors');

dotenv.config();
connectDB(); // connecting to the database

const app = express();
app.use(express.json());
app.use(cors());
app.use('/api/users', userRoutes); // Use user Routes
app.use('/api/contact', contactRoutes); // Use contact Routes


const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));