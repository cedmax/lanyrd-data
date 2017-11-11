const eachSeries = require('async').eachSeries
const request = require('request')
const cheerio = require('cheerio')
const config = require('./settings.json')

module.exports = (db, resolve) => {
  function collect ({year, page}, next) {
    console.log(`${year}: page #${page}: in progress`)

    request(`${config.domain}/topics/javascript/${year}/?page=${page}`, (error, response, html) => {
      if (!error && response.statusCode === 200) {
        console.log(`${year}: page #${page}: fetched`)

        const $ = cheerio.load(html)
        $('.primary.day-schedule ol li h4 a.summary.url').each(function (i, element) {
          const a = $(element)
          const href = a.attr('href')
          const year = parseInt(href.match(/(\d)+/)[0], 10)
          const title = a.html()
          const url = config.domain + href
          db.events.update({ title, year }, {
            title,
            year,
            url
          }, { upsert: true })
        })

        collect({year, page: ++page}, next)
      } else {
        console.log(`done until page #${--page}`)
        next()
      }
    })
  }

  eachSeries(config.years.map(year => ({year, page: 1})), collect, resolve)
}
