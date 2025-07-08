import {formatISO } from "date-fns"

export class DateFormatter{
  static currentDayPlusOne(){
    const currentDate = new Date(Date.now())
    const currentDay = currentDate.getDate()+1
    const currentYear = currentDate.getFullYear()
    const currentMonth = currentDate.getMonth()
    return formatISO(new Date(currentYear, currentMonth,currentDay), { representation: 'date' })
  }
}