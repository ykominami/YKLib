export class Dayx {
  date: Date;
  private constructor(day: Date) {
    this.date = day;
  }

  static today(): Dayx {
    const date = new Date();
    return new Dayx(date);
  }
  static setYearMonthDate(year: number, month: number, date: number): Dayx {
    const day = new Date(year, month, date);
    return new Dayx(day);
  }
  year(): number {
    return this.date.getFullYear();
  }
  month(): number {
    return this.date.getMonth();
  }
  day(): number {
    return this.date.getDay();
  }
  yearMonthStr(): string {
    //return this.day.format('YYYY-MM');
    return Utilities.formatDate(this.date, "JST", "yyyy-MM");
  }
  dayStr(): string {
    // return this.day.format('YYYY-MM-DD');
    return Utilities.formatDate(this.date, "JST", "yyyy-MM-dd");
  }
}

// export default Dayx;