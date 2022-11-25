export default function getdDay(pickedDate: string) {
  const getToday = new Date().toISOString() 
  
  const selectedDate = new Date(pickedDate!) as unknown as number
  const todayDate = new Date(getToday) as unknown as number

  const subDate = selectedDate - todayDate
  
  const dDay = subDate >= 0 
                ? Math.floor(subDate / (1000 * 60 * 60 * 24))
                : Math.ceil(subDate / (1000 * 60 * 60 * 24))

  return dDay
}