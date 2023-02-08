const express = require('express');
const dotenv = require('dotenv');
const connectDB = require('./config/db');

//Load env vars
dotenv.config({path:'./config/config.env'});

connectDB();

//Route
const app = express();
app.use(express.json());
const hospitals = require (`./routes/hospitals`);
app.use(`/api/v1/hospitals`,hospitals)

//Body parser
const PORT = process.env.PORT || 3000;
app.listen(PORT,console.log('Server running in ',process.env.NODE_ENV,' mode on port ',PORT))
//Handle unhandled promise rejections
process.on('unhandledRejection',(err,procmise)=>{
    console.log(`Error: ${err.message}`);
    //Close server & exit process
    server.close(()=>process.exit(1));
});