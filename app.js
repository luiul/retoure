// Initial setup
const express = require('express')
const path = require('path')
const exphbs = require('express-handlebars')
const dotenv = require('dotenv')


dotenv.config({ path: "./.env" })

const app = express()

// App and database variables
const PORT = process.env.PORT || 5000
// const DB_NAME = process.env.DB_NAME
// const HOST = process.env.HOST
// const DB_USER = process.env.DB_USER
// const DB_PASSWORD = process.env.DB_PASSWORD

// Handlebars
app.engine('handlebars', exphbs({ defaultLayout: 'main' }))
app.set('view engine', 'handlebars')

// Set static folder
app.use(express.static(path.join(__dirname, 'public')))


// Index route
app.get('/', (req, res) => {
    res.render('index', { layout : 'landing' })
})

// Transport routes
app.use('/transport', require('./routes/transport'))


app.listen(PORT, console.log(`Server started on port ${PORT}`))


// Export db object
const db = require('./config/database')

// Testing the connection (we remove the await keyword)
try {
    db.authenticate();
    console.log('Connection has been established successfully.');
} catch (error) {
    console.error('Unable to connect to the database:', error);
}