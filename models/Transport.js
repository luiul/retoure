// Transort object model 
const { Sequelize } = require('sequelize');
const db = require('../config/database')

const Transport = db.define('transport', {
    transport_status: {
        type: Sequelize.STRING
    },
    paket_bez: {
        type: Sequelize.STRING
    },
    fach_bez: {
        type: Sequelize.STRING
    },
    zbs_bez: {
        type: Sequelize.STRING
    },
    tour_bez: {
        type: Sequelize.STRING
    },
    emp_name: {
        type: Sequelize.STRING
    },
    emp_plz: {
        type: Sequelize.STRING
    },
    abd_name: {
        type: Sequelize.STRING
    },
    abd_plz: {
        type: Sequelize.STRING
    }

})

module.exports = Transport

// Change default timestamps: https://stackoverflow.com/questions/39587767/disable-updatedat-update-date-field-in-sequelize-js
// var user = sequelize.define('user', { /* bla */ }, {

//     // don't add the timestamp attributes (updatedAt, createdAt)
//     timestamps: false,

//     // If don't want createdAt
//     createdAt: false,

//     // If don't want updatedAt
//     updatedAt: false,

//     // your other configuration here

// });