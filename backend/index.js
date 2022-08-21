const DB = require('./Db')
const express = require('express')
const app = express();
const formidable = require('express-formidable');


app.use(express.json())
app.use(formidable());


const users = require('./routes/userRoutes');
app.use('/user',users)


app.listen(8000)