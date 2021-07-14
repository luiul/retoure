const express = require('express')
const router = express.Router()
const db = require('../config/database')
const Transport = require('../models/Transport')

// Testing transport page
// router.get('/',(req,res)=>{
//     res.send('TRANSPORT')
// })

router.get('/', (req, res) => {
    Transport.findAll()
        .then(transport => {
            console.log(transport)
            res.sendStatus(200)
        }) 
        .catch(err => console.log(err))
})

module.exports = router