const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec']

export const getToday = () => new Date()

export const formattedDate = (date) => {
  date = new Date(date)
  return months[date.getMonth()] + ' ' + date.getDate() + ', ' + date.getFullYear()
}

export const formattedShortDate = (date) => {
  date = new Date(date)
  return months[date.getMonth()] + ' ' + date.getDate()
}

export const formattedToday = () => {
  const today = getToday()
  return formattedDate(today)
}

export const formattedShort = () => {
  const today = getToday()
  return formattedShortDate(today)
}

export const isToday = (date) => {
  date = new Date(date)
  const today = new Date()
  return today.toDateString() == date.toDateString()
}

export const isYesterday = (date) => {
  date = new Date(date)
  let yesterday = new Date()
  yesterday.setDate(yesterday.getDate() - 1)
  return yesterday.toDateString() == date.toDateString()
}
