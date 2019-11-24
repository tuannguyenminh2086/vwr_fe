export const formatDate = (date) => {
  let dd = date.getDate()
  var mm = date.getMonth() + 1 // January is 0!

  var yyyy = date.getFullYear()
  if (dd < 10) {
    dd = '0' + dd
  }
  if (mm < 10) {
    mm = '0' + mm
  }
  return yyyy + '/' + mm + '/' + dd
}

export const roundResponseStatus = status => {
  return Math.round(status / 100) * 100
}

export const isMacOS = () => {
  return navigator.platform.search(/Mac/) > -1
}

export const roundDecimalNumber = num => {
  return Math.round(num * 100) / 100
}
