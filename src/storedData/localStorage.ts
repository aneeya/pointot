function getUser() {
  const user = window.localStorage.getItem('user')
  if(user !== null ) {
    const { name, email, id } = JSON.parse(user)
    return { name, email, id }
  }
  else return {}
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
  const selected = window.localStorage.getItem('selectedSchedule')
  if(selected !== null) {
    const { title, city, startDate, endDate } = JSON.parse(selected)
    return { title, city, startDate, endDate }
  }
  else return {}
}

export {getUser, getEnded, getTravelId, getSelected}