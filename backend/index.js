const DB = require('./Db')
const express = require('express')
const app = express();
app.use(express.json())
const users = require('./routes/userRoutes');
app.use('/user',users)


app.listen(8000)