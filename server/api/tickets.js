const router = require('express').Router()

const { Ticket } = require('../db/models')

module.exports = router

//GET ALL TICKETS
router.get('/', async (req, res, next) => {
    try {
        const tickets = await Ticket.findAll()
        res.json(tickets)
      } catch (err) {
        next(err)
      }
})

router.post('/default', async (req, res, next) => {
    try {
        const ticket = await Ticket.create({ text: "Default ticket created" })
        res.json(ticket)
      } catch (err) {
        next(err)
      }
})

//POST A TICKET W REQ.BODY
router.post('/', async (req, res, next) => {
    try {
        const ticket = await Ticket.create({ text: req.body.text })
        res.json(ticket)
      } catch (err) {
        next(err)
      }
})

//GET TOP TICKET, TODO
router.get('/', async (req, res, next) => {
    try {
        //FIND ONE WHERE IT IS TOP TICKET 
      } catch (err) {
        next(err)
      }
})

