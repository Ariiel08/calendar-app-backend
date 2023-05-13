const express = require('express');
require('dotenv').config();
const cors = require('cors');
const { dbConnection } = require('./database/config');



const port = process.env.PORT;

//* Server
const app = express();

//* Database
dbConnection();

//* CORS
app.use( cors() );

//* Public files
app.use( express.static('public') );

app.use( express.json() );

//* Routes
app.use('/api/auth', require('./routes/authRoutes'));
app.use('/api/events', require('./routes/eventsRoutes'));

//* Listening port
app.listen( port, () => {
    console.log(`Running server on port ${port}`);
});