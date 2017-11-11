const inquirer = require('inquirer')
const fs = require('fs')
const modules = require('./modules')
const Datastore = require('nedb')

const dir = './data'
if (!fs.existsSync(dir)) {
  fs.mkdirSync(dir)
}

const db = {
  events: new Datastore({ filename: './data/events', autoload: true }),
  speakers: new Datastore({ filename: './data/speakers', autoload: true })
}
const actionable = modules(db)

const questions = [{
  type: 'confirm',
  name: 'skipReFetch',
  message: 'Skip fetching all events from Lanyrd?',
  default: true
}]

inquirer.prompt(questions).then((answers) => {
  actionable
    .fetchEventList(answers.skipReFetch)
    .then(actionable.fetchConferences)
    .then(actionable.getSpeakers)
    .then(() => {
      db.events.persistence.compactDatafile()
      db.speakers.persistence.compactDatafile()
    })
})
