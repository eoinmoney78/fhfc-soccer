// Dependencies

require('dotenv').config();

const express = require('express');
const app = express();

const cloudinary = require('./cloudinaryConfig');
const multer = require('multer');
const upload = multer({ dest: 'uploads/' });
const cors = require('cors');

const PORT = process.env.PORT || 5002;

const { db } = require('./db');

// Middleware

app.use(express.json());
app.use(cors());
const { playerController, userController } = require('./controllers');

app.use('/user', userController);
app.use('/player', playerController);

app.post('/image/upload', upload.single('image'), (req, res) => {
    // req.file is the 'image' file
    // req.body will hold the text fields, if there were any

    // console.log('Request body:', req.body);
    // console.log('Request file:', req.file);

    const playerData = req.body;

    // Upload the image to Cloudinary
    cloudinary.uploader.upload(req.file.path, (error, result) => {
        if (error) {
            console.error('Upload error:', error);
            res.status(500).json({ message: 'Error uploading image to Cloudinary.' });
        } else {
            console.log('Upload result:', result);
            // Update the img field with the secure_url from the Cloudinary response
            playerData.img = result.secure_url;
            console.log('Updated playerData with img:', playerData);

            // Save the playerData to your database
            // (You should replace this with your actual database save logic)
            res.status(200).json({ message: 'Data received and saved.' });
        }
    });
});


const server = async () => {
    db();
    app.listen(PORT, () => console.log(`Server is running on Port: ${PORT}`))
};

server();