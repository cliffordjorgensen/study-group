require('dotenv').config();
const express = require('express');
const app = express();
const PORT = 3000;
const mongoose = require('mongoose');

mongoose.connect(process.env.DATABASE_URL, { useNewUrlParser: true });
const db = mongoose.connection
db.on('error', (error) => console.error(error));
db.once('open', () => console.log('connected to db!'));


app.use(express.urlencoded({ extended: true }));
app.use(express.json());

const apiRouter = require('./routes/apiRoutes');

app.use('/api', apiRouter);

app.listen(PORT, () => console.log(`server started on ${PORT}`));