const express = require('express')
const router = express.Router()

// Testing transport page
router.get('/',(req,res)=>{
    res.send('TRANSPORT')
})

module.exports = router