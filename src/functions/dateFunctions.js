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

  const dateDate = months[date.getMonth()] + ' ' + date.getDate() + ', ' + date.getFullYear()
  const todayDate = months[today.getMonth()] + ' ' + today.getDate() + ', ' + today.getFullYear()

  return todayDate === dateDate
}

export const isYesterday = (date) => {
  date = new Date(date)
  let yesterday = new Date()
  yesterday.setDate(yesterday.getDate() - 1)

  const dateDate = months[date.getMonth()] + ' ' + date.getDate() + ', ' + date.getFullYear()
  const yesterdayDate = months[yesterday.getMonth()] + ' ' + yesterday.getDate() + ', ' + yesterday.getFullYear()

  return yesterdayDate === dateDate
}
