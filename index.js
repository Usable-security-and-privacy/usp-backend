const express = require('express');
const app = express();
const cors = require('cors');
require('dotenv').config()
require('./config/mongoose');

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

const Data=require('./models/data');

app.post('/api/submit', async (req, res) => {
    try {
        const data = req.body;
        const newData = new Data(data);
        await newData.save();
        res.json({
            status: 'success',
            message: 'Data saved successfully'
        });
    } catch (error) {
        res.json({
            status: 'error',
            message: error.message
        });
    }
});