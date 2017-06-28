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
  const today = getToday()

  const dateDate = formattedDate(date)
  const todayDate = formattedDate(today)

  return todayDate === dateDate
}

export const isYesterday = (date) => {
  date = new Date(date)
  let yesterday = getToday()
  yesterday.setDate(yesterday.getDate() - 1)

  const dateDate = formattedDate(date)
  const yesterdayDate = formattedDate(yesterday)

  return yesterdayDate === dateDate
}
