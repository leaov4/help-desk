'use strict'

const db = require('../server/db')
const {User, Ticket} = require('../server/db/models')

async function seed() {
  await db.sync({force: true})
  console.log('db synced!')

  const users = await Promise.all([
    User.create({email: 'lea@lea.com', password: '123'}),
    User.create({email: 'jane@jane.com', password: '456'})
  ])

  const tickets = await Promise.all([
    Ticket.create({text: 'Need help with resizing screen'}),
    Ticket.create({text: 'Email is down'})
  ])

  console.log(`seeded ${users.length} users`)
  console.log(`seeded ${tickets.length} successfully`)
}

async function runSeed() {
  console.log('seeding...')
  try {
    await seed()
  } catch (err) {
    console.error(err)
    process.exitCode = 1
  } finally {
    console.log('closing db connection')
    await db.close()
    console.log('db connection closed')
  }
}


if (module === require.main) {
  runSeed()
}


module.exports = seed