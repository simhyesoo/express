const express = require('express')
const fs = require('fs');
const cors = require('cors')
const bodyParser = require('body-parser');
require('dotenv').config({ path: '.env' })
const app = express();
const test = require('./router/test.js');
const push = require('./router/push.js');


let data = JSON.parse(fs.readFileSync('./data.json'));

app.use(cors());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use('/', test.testRouter)
app.use('/push', push)


app.listen(3001, test.dbConnect)