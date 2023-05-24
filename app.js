// Dependencies

require('dotenv').config();

const express = require('express');
const app = express();


const cors = require('cors');

const PORT = process.env.PORT || 5002;

const { db } = require('./db');

// Middleware

app.use(express.json());
app.use(cors());
const { playerController, userController } = require('./controllers');

app.use('/player', playerController);
app.use('/user', userController);


const server = async () => {
    db();
    app.listen(PORT, () => console.log(`Server is running on Port: ${PORT}`))
};

server();