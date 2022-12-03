function getUser() {
  const user = window.localStorage.getItem('user')
  const { name, email, id } = JSON.parse(user!)

  return { name, email, id }
}

function getEnded() {
  const ended = window.localStorage.getItem('ended')

  return Number(ended)
}

function getTravelId() {
  const travelId = window.localStorage.getItem('travelId')
  return travelId
}

function getSelected() {
  const slected = window.localStorage.getItem('selectedSchedule')
  const { title, city, startDate, endDate } = JSON.parse(slected!)
  return { title, city, startDate, endDate }
}

export {getUser, getEnded, getTravelId, getSelected}