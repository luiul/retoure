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