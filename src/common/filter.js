import Accounting from 'accounting'
import Moment from 'moment'
import 'moment/locale/id'

export function currency (value, symbol = '') {
  if (!value) return ' - '
  return Accounting.formatMoney(value, symbol, 0, '.', ',')
}

export function date (date, format = 'DD MMMM YYYY hh:mm', suffix = '') {
  if (!date) return ' - '
  return Moment(date).format(format, 'id') + suffix
}

export function ago (date) {
  if (!date) return ' - '
  return Moment(date).locale('id').fromNow()
}

export function substring (text, length = '50') {
  if (text) {
    const ellipsis = (text.length >= length) ? '...' : ''
    return text.substring(0, length) + ' ' + ellipsis
  }

  return '-'
}
