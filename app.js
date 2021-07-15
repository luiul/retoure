// Entry point
// Initial setup
const express = require('express')
const path = require('path')
const exphbs = require('express-handlebars')
const dotenv = require('dotenv')
// const bodyParser = require('body-parser');
const { allowInsecurePrototypeAccess } = require('@handlebars/allow-prototype-access')
const Handlebars = require('handlebars')


dotenv.config({ path: "./.env" })

const app = express()

// App and database variables
const PORT = process.env.PORT || 5000
// const DB_NAME = process.env.DB_NAME
// const HOST = process.env.HOST
// const DB_USER = process.env.DB_USER
// const DB_PASSWORD = process.env.DB_PASSWORD

// Handlebars middlewearv    
app.engine('handlebars', exphbs({
    defaultLayout: 'main', handlebars: allowInsecurePrototypeAccess(Handlebars)
}))
app.set('view engine', 'handlebars')

// Body Parser
// app.use(bodyParser.urlencoded({extended:false}))
app.use(express.urlencoded({ extended: true }));

// Set static folder
app.use(express.static(path.join(__dirname, 'public')))

// Index route
app.get('/', (req, res) => {
    res.render('index', { layout: 'landing' })
})

// Transport routes
app.use('/transport', require('./routes/transport'))


app.listen(PORT, console.log(`Server started on port ${PORT}`))

// Database
// Export db object
const db = require('./config/database')
const bodyParser = require('body-parser')

// Testing the connection (we remove the await keyword)
try {
    db.authenticate();
    console.log('Connection has been established successfully.');
} catch (error) {
    console.error('Unable to connect to the database:', error);
}