const _ = require('lodash')
const eachSerie = require('async').eachSeries
const ProgressBar = require('cli-progress-bar')
const bar = new ProgressBar()
let counter = 1

module.exports = (db, resolve) => {
  const updateOrInsert = (total) => (speaker, next) => {
    bar.show(`${counter}/${total} - ${speaker.name}`, counter / total)

    db.speakers.update({ name: speaker.name }, { ...speaker }, { upsert: true }, () => {
      counter++
      next()
    })
  }

  db.events.find({ $where: function () { return this.speakers.length > 5 } }, (err, conferences) => {
    if (err) console.log(err)

    let allSpeakers = []

    _.forOwn(conferences, (conf) => {
      allSpeakers = _.concat(allSpeakers, conf.speakers)
    })

    const uniqueSpeakers = _.sortBy(_.map(_.uniqBy(allSpeakers, 'name'), ({name, handle, img}) => ({
      name,
      handle: handle.replace('@', ''),
      count: _.filter(allSpeakers, (speaker) => name === speaker.name).length
    })), 'name')

    eachSerie(uniqueSpeakers, updateOrInsert(uniqueSpeakers.length), resolve)
  })
}
