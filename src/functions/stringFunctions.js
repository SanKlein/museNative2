export const capitalizeFirstLetter = (str) => {
  return str.charAt(0).toUpperCase() + str.substr(1)
}

export const checkLettersAndNumbers = (str) => {
  return /^\w+$/.test(str)
}

export const checkEmail = (str) => {
  return /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/.test(str)
}
