const express = require('express')
const router = express.Router()
const db = require('../config/database')
const Transport = require('../models/Transport')

// Testing transport page
// router.get('/',(req,res)=>{
//     res.send('TRANSPORT')
// })

// Get transport list
router.get('/', (req, res) => {
    Transport.findAll()
        .then(transport => {
            // console.log(transport)
            res.render('transport', {
                transport
            })
        })
        .catch(err => console.log(err))
})

// Display add gig form
router.get('/add', (req, res) => res.render('add'))

// Add transport (hardcoded to start with)
router.post('/add', (req, res) => {
    const data = {
        transport_status: 1,
        paket_id: 7,
        paket_bez: 'Watch',
        fach_bez: 'Fach 6',
        zbs_bez: 'ZBS 1',
        tour_bez: 'NRW 1',
        tour: ['00000', '00001', '00002', '00003', '00ß00'],
        emp_name: 'Charlie',
        emp_plz: '00001',
        abd_name: 'Bob',
        abd_plz: '00001',
        abholversuch: 0,
        alter:0
    }

    let { transport_status, paket_id, paket_bez, fach_bez, zbs_bez, tour_bez, tour, emp_name, emp_plz, abd_name, abd_plz, abholversuch, alter } = data

    // Insert into table
    Transport.create({
        transport_status, paket_id, paket_bez, fach_bez, zbs_bez, tour_bez, tour, emp_name, emp_plz, abd_name, abd_plz, abholversuch, alter
    })
        .then(transport => res.redirect('/transport'))
        .catch(err => console.log(err))

})

// sequelize handles the createdAt and updatedAt

module.exports = router
