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
            res.render('transport',{
                transport
            })
        })
        .catch(err => console.log(err))
})

// Add transport 
router.get('/add', (req, res) => {
    const data = {
        transport_status: 0,
        paket_id: 2,
        paket_bez: 'SSD',
        fach_id: 2,
        fach_bez: 'Fach 2',
        zbs_id: 1,
        zbs_bez: 'ZBS 1',
        tour_id: 1,
        tour_bez: 'NRW',
        tour: ['Depot', 'Koeln', 'Duesseldorf', 'Muenster', 'Depot'],
        emp_id: 2,
        emp_name: 'Charlie',
        emp_plz: '00001',
        abd_id: 2,
        abd_name: 'David',
        abd_plz: '00001',
        abholversuch: 0
    }

    let { transport_status, paket_id, paket_bez, fach_id, fach_bez, zbs_id, zbs_bez, tour_id, tour_bez, tour, emp_id, emp_name, emp_plz, abd_id, abd_name, abd_plz, abholversuch } = data

    // Insert into table
    Transport.create({
        transport_status, paket_id, paket_bez, fach_id, fach_bez, zbs_id, zbs_bez, tour_id, tour_bez, tour, emp_id, emp_name, emp_plz, abd_id, abd_name, abd_plz, abholversuch
    })
        .then(transport => res.redirect('/transport'))
        .catch(err => console.log(err))

})

// sequelize handles the createdAt and updatedAt

module.exports = router
