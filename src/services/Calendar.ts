import assertNever from "assert-never";

export type DayOfWeek = 'sun' | 'mon' | 'tue' | 'wed' | 'thu' | 'fri' | 'sat'
export type PartOfDay = 'morning' | 'afternoon' | 'evening'
export type Moment = [DayOfWeek, PartOfDay]

export const displayDayOfWeek: (day: DayOfWeek) => string = day => {
  switch(day) {
    case 'sun': return 'Sunday';
    case 'mon': return 'Monday';
    case 'tue': return 'Tuesday';
    case 'wed': return 'Wednesday';
    case 'thu': return 'Thursday';
    case 'fri': return 'Friday';
    case 'sat': return 'Saturday';
    default: assertNever(day);
  }
}

export default class Calendar {
  static look(day: Date): Moment {
    let calendar: Calendar = new Calendar(day)
    return [
      calendar.dayOfWeek,
      calendar.timeOfDay,
    ];
  }
  constructor(private date: Date) {}
  get dayOfWeek(): DayOfWeek {
    let num: 0|1|2|3|4|5|6 = this.date.getDay() as 0|1|2|3|4|5|6
    let dayOfWeek = '???'
    switch (num) {
      case 0: dayOfWeek = 'sun'; break;
      case 1: dayOfWeek = 'mon'; break;
      case 2: dayOfWeek = 'tue'; break;
      case 3: dayOfWeek = 'wed'; break;
      case 4: dayOfWeek = 'thu'; break;
      case 5: dayOfWeek = 'fri'; break;
      case 6: dayOfWeek = 'sat'; break;
      default: assertNever(num);
    }
    return dayOfWeek as DayOfWeek;
  }
  get timeOfDay(): PartOfDay {
    let date = new Date();
    let hour = date.getHours()
    if (hour > 3 && hour < 12) { return 'morning' }
    else if (hour > 12 && hour < 23) { return 'afternoon' }
    else { return 'evening' }
  }
}