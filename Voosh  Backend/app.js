const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const userRoutes = require('./routes/userRoutes');
const orderRoutes = require('./routes/orderRoutes');

const app = express();

app.use(bodyParser.json());


mongoose.connect('mongodb+srv://sharpviking:l9a53607@cluster0.0maezhz.mongodb.net/test', {
    useNewUrlParser: true,
    useUnifiedTopology: true,
});

const dbConnection = mongoose.connection;

dbConnection.on('connected', () => {
    console.log('Connected to the database');
});

dbConnection.on('error', (error) => {
    console.error('Database connection error:', error);
});

dbConnection.on('disconnected', () => {
    console.log('Disconnected from the database');
});

app.use('/users', userRoutes);
app.use('/orders', orderRoutes);

app.get('/', (req, res) => {
    res.send("connected")
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
