const collectEventsList = require('./collect-events-list')
const collecteventsDetails = require('./collect-events-details')
const getSpeakers = require('./get-speakers')

const skippablePromise = (action) => (skipAction) => new Promise(resolve => {
  if (skipAction) return resolve()
  else action(resolve)
})

module.exports = (db) => ({
  fetchEventList: skippablePromise((resolve) => collectEventsList(db, resolve)),
  fetchConferences: () => new Promise((resolve) => collecteventsDetails(db, resolve)),
  getSpeakers: () => new Promise((resolve) => getSpeakers(db, resolve))
})
