const moment = require('moment')

function formatDateForInput (date) {
  if(!date) return moment().format('YYYY-MM-DD')
  return moment(new Date(parseInt(date))).format('YYYY-MM-DD')
}

module.exports = {
  formatDateForInput
}
