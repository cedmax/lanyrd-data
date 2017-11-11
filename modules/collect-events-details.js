const eachLimit = require('async').eachLimit
var request = require('request')
var cheerio = require('cheerio')

module.exports = (db, resolve) => {
  function fetch (event, next) {
    request(event.url, function (error, response, html) {
      if (!error && response.statusCode === 200) {
        var $ = cheerio.load(html)
        console.log(`Event: ${event.title} || Speakers: ${$('#speaker-list li').length}`)
        const speakers = []

        $('#speaker-list li').each((i, element) => {
          speakers.push({
            name: $(element).find('.name').text().trim(),
            handle: $(element).find('.handle').text().trim(),
            img: $(element).find('img').attr('src')
          })
        })

        db.events.update({ url: event.url }, { $set: {
          date: $('abbr.dtstart').attr('title'),
          location: {
            city: $('.prominent-place .sub-place').text().trim(),
            country: $('.prominent-place .flag-large').text().trim()
          },
          speakers
        }}, next)
      }
    })
  }

  db.events.find({ speakers: { $exists: false } }, (err, events) => {
    if (err) console.log(err)
    eachLimit(events, 15, fetch, resolve)
  })
}
