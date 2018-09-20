const express = require('express');
const mongoose = require('mongoose');

const users = require('./routes/api/users');
const profile= require('./routes/api/profile');
const posts = require('./routes/api/posts');

const app = express();

//Data Base Config
const db = require('./config/keys').mongoURI;

// Connect to Data Base
mongoose
    .connect(db, { useNewUrlParser: true })
    .then(() => console.log('Database Successfully Connected'))
    .catch(errmsg => console.log(`Database DID NOT connect ${errmsg}`));


app.get('/', (req, res) => res.send('Hello world'));

//Use routes
app.use('/api/users', users);
app.use('/api/profile', profile);
app.use('/api/posts', posts);


const port = process.env.PORT || 5000;

app.listen(port, () => console.log(`Server listening on port: ${port}`));