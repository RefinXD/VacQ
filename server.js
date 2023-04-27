const express = require('express');
const dotenv = require('dotenv');
const connectDB = require('./config/db');
const cookieParser = require('cookie-parser')
//Load env vars
const xss = require('xss-clean')
const helmet = require('helmet')
const mongoSanitize = require('express-mongo-sanitize')
const rateLimit = require('express-rate-limit')
const hpp = require('hpp')
const swaggerJsDoc = require('swagger-jsdoc')
const swaggerUI = require('swagger-ui-express');

dotenv.config({path:'./config/config.env'});

const swaggerOptions={
    swaggerDefinition:{
        openapi: '3.0.0',
        info:{
            title:'Library API',
            version: '1.0.0',
            description: 'A simple Express VacQ API'
        },
        servers: [
            {
                url: 'http://localhost:3000/api/v1'
            }
        ]
    },
    apis:['./routes/*.js'],
};

connectDB();
//Rate Limiting
const limiter = rateLimit({
    windowsMs:10*60*1000,
    max:100
})
//Route
const cors = require('cors');
const app = express();
const swaggerDocs=swaggerJsDoc(swaggerOptions);
app.use('/api-docs',swaggerUI.serve,swaggerUI.setup(swaggerDocs));
app.use(cors())
app.use(express.json());
app.use(mongoSanitize());
app.use(hpp())
app.use(cookieParser());
app.use(helmet());
app.use(xss());
app.use(limiter)
const hospitals = require (`./routes/hospitals`);
const auth = require('./routes/auth');
const appointments = require('./routes/appointments');

app.use(`/api/v1/hospitals`,hospitals)
app.use('/api/v1/auth',auth)
app.use('/api/v1/appointments',appointments);
//Body parser
const PORT = process.env.PORT || 3000;
const server = app.listen(PORT,console.log('Server running in ',process.env.NODE_ENV,' mode on port ',PORT))
//Handle unhandled promise rejections
process.on('unhandledRejection',(err,promise)=>{
    console.log(`Error: ${err.message}`);
    //Close server & exit process
    server.close(()=>process.exit(1));
});