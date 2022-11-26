const express = require('express');
const app = express();
const cors = require('cors');
require('dotenv').config()
const mongoose=require('./config/mongoose');
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

const AdminJS = require('adminjs');
const AdminJSExpress = require('@adminjs/express');

const Data=require('./models/data');

const AdminJSMongoose = require("@adminjs/mongoose");

AdminJS.registerAdapter(AdminJSMongoose)

const admin = new AdminJS({
    rootPath: '/admin',
    resources: [
        Data, // you can simply pass a model
    ]
})
const adminRouter = AdminJSExpress.buildRouter(admin)
app.use(admin.options.rootPath, adminRouter)

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

app.listen(process.env.PORT, () => {
    console.log(`Server is running on port ${process.env.PORT}`);
});