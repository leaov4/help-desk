const Sequelize = require('sequelize')
const db = require('../db')

const Ticket = db.define('ticket', {
    text:  {
        type: Sequelize.TEXT,
        allowNull: false,
        defaultValue: ' '
    }
})

module.exports = Ticket