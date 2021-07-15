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
    // const data = {
    //     transport_status: 1,
    //     paket_id: 7,
    //     paket_bez: 'Watch',
    //     fach_bez: 'Fach 6',
    //     zbs_bez: 'ZBS 1',
    //     tour_bez: 'NRW 1',
    //     tour: ['00000', '00001', '00002', '00003', '00ß00'],
    //     emp_name: 'Charlie',
    //     emp_plz: '00001',
    //     abd_name: 'Bob',
    //     abd_plz: '00001',
    //     abholversuch: 0,
    //     alter:0
    // }

    let { paket_id, paket_bez, fach_bez, zbs_bez, tour_bez, tour, emp_name, emp_plz, abd_name, abd_plz } = req.body

    // Prepare tour array for Sequelize
    tour = tour.split(',')

    // Server-side validation
    let errors = [];

    // Validate Fields
    if (!paket_id) {
        errors.push({ text: 'Packet-ID hinzufügen!' })
    }
    if (!paket_bez) {
        errors.push({ text: 'Packet-Bezeichnung hinzufügen!' })
    }
    if (!fach_bez) {
        errors.push({ text: 'Fach-Bezeichnung hinzufügen!' })
    }
    if (!zbs_bez) {
        errors.push({ text: 'ZBS-Bezeichnung hinzufügen!' })
    }
    if (!tour_bez) {
        errors.push({ text: 'Tour-Bezeichnung hinzufügen!' })
    }
    if (!tour) {
        errors.push({ text: 'Tour hinzufügen!' })
    }
    if (!emp_name) {
        errors.push({ text: 'Empfänger hinzufügen!' })
    }
    if (!emp_plz) {
        errors.push({ text: 'Empfänger-PLZ hinzufügen!' })
    }
    if (!abd_name) {
        errors.push({ text: 'Absender hinzufügen!' })
    }
    if (!abd_plz) {
        errors.push({ text: 'Absender-PLZ hinzufügen!' })
    }

    // console.log(errors)

    // Check for errors
    if (errors.length > 0) {
        res.render('add', {
            errors,
            paket_id, paket_bez, fach_bez, zbs_bez, tour_bez, tour, emp_name, emp_plz, abd_name, abd_plz
        })
    } else {
        // Insert into table
        Transport.create({
            transport_status, paket_id, paket_bez, fach_bez, zbs_bez, tour_bez, tour, emp_name, emp_plz, abd_name, abd_plz, abholversuch, alter
        })
            .then(transport => res.redirect('/transport'))
            .catch(err => console.log(err))
    }


})

// sequelize handles the createdAt and updatedAt

module.exports = router
