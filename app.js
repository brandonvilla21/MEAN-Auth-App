const express    = require('express');
const path       = require('path');
const bodyParser = require('body-parser');
const cors       = require('cors');
const passport   = require('passport');
const mongoose   = require('mongoose');
const config     = require('./config/database');
const port       = 3000;
const users      = require('./routes/users');

// Connect to Database
mongoose.connect(config.database);
// On connection
mongoose.connection.on('connected', () => {
    console.log('Conected to databse ' + config.database);
});
// On error 
mongoose.connection.on('error', err => {
    console.log('Databse error ' + err);
});

const app = express();

// Middleware
app.use(cors());
app.use(bodyParser.json());

// Set static folder
app.use(express.static(path.join(__dirname, 'public')));

// Use user routes
app.use('/users', users);

app.get('/', (req, res) => {
    res.send('Invalid endpoint');
})

// Set listening port
app.listen(port, () => {
    console.log(`Server started on port ${port}`);
});
