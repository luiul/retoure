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
        transport_status: 0,
        paket_id: 2,
        paket_bez: 'SSD',
        fach_bez: 'Fach 2',
        zbs_bez: 'ZBS 1',
        tour_bez: 'NRW',
        tour: ['Depot', 'Koeln', 'Duesseldorf', 'Muenster', 'Depot'],
        emp_name: 'Charlie',
        emp_plz: '00001',
        abd_name: 'David',
        abd_plz: '00001',
        abholversuch: 0
    }

    let { transport_status, paket_id, paket_bez, fach_bez, zbs_bez, tour_bez, tour, emp_name, emp_plz, abd_name, abd_plz, abholversuch } = data

    // Insert into table
    Transport.create({
        transport_status, paket_id, paket_bez, fach_bez, zbs_bez, tour_bez, tour, emp_name, emp_plz, abd_name, abd_plz, abholversuch
    })
        .then(transport => res.redirect('/transport'))
        .catch(err => console.log(err))

})

// sequelize handles the createdAt and updatedAt

module.exports = router
