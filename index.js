const express = require('express');
const app = express();
const cors = require('cors');
require('dotenv').config()
require('./config/mongoose');

const logger = require('./logger');
const axios = require('axios').default;
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

const Data=require('./models/data');

const readline = require('readline').createInterface({
    input: process.stdin,
    output: process.stdout,
});

readline.question(`Please Enter Team Id?`, teamId => {
    axios.get(`https://private-anon-8abd269f9f-clickup20.apiary-mock.com/api/v2/team/${teamId}/time_entries`)
  .then(async function (response) {
      console.log(JSON.stringify(response.data.data))
   let data= await Data.create({data:JSON.stringify(response.data.data)});
  })
  .catch(function (error) {
      console.log(error.message)
    logger.error(error);
  });
    readline.close();
});

