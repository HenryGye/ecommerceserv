import { Component, HostListener } from '@angular/core';

@Component({
  selector: 'app-calendario-fecha',
  templateUrl: './calendario-fecha.component.html',
  styleUrls: ['./calendario-fecha.component.css']
})
export class CalendarioFechaComponent {
  selectedDateFormatted = "";
  selectedDate: Date | undefined;
  showCalendar: boolean = false;
  days: Date[] = [];
  daysOfWeek: string[] = ['Lun', 'Mar', 'Mie', 'Jue', 'Vie', 'Sáb', 'Dom'];
  currentMonth: string = '';
  currentYear: number = new Date().getFullYear();
  currentMonthIndex: number = new Date().getMonth();
  emptyDate = new Date(0);

  constructor() {
    this.generateDays();
  }

  @HostListener('document:click', ['$event'])
  onClick(event: MouseEvent) {
    console.log('click');
    console.log('event.target ', event.target);
    const calendar = document.getElementsByClassName('calendar')[0];
    const input = document.getElementsByClassName('date-input')[0];
    const calendarIcon = document.getElementsByClassName('calendar-icon');
    const calendarDaysHeader = document.getElementsByClassName('calendar-days-header');
    const calendarHeader = document.getElementsByClassName('calendar-header');

    if (event.target === input || Array.from(calendarIcon).some(e => e.contains(event.target as Node))) {
      this.showCalendar = !this.showCalendar;
      return;
    }

    this.showCalendar = (event.target === calendar || Array.from(calendarHeader).some(e => e.contains(event.target as Node)) || Array.from(calendarDaysHeader).some(e => e.contains(event.target as Node))) ? true : false;
  }

  generateDays() {
    this.days = [];
    const firstDayOfMonth = new Date(this.currentYear, this.currentMonthIndex, 1);
    const lastDayOfMonth = new Date(this.currentYear, this.currentMonthIndex + 1, 0);
    const offset = (firstDayOfMonth.getDay() + 6) % 7;
    let currentDate = new Date(firstDayOfMonth);
    this.currentMonth = this.getMonthName(this.currentMonthIndex);
  
    for (let i = 0; i < offset; i++) {
      this.days.push(this.emptyDate);
    }
  
    while (currentDate <= lastDayOfMonth) {
      this.days.push(new Date(currentDate));
      currentDate.setDate(currentDate.getDate() + 1);
    }
  }

  getMonthName(monthIndex: number): string {
    const months = ["Enero", "Febrero", "Marzo", "Abril", "Mayo", "Junio","Julio", "Agosto", "Septiembre", "Octubre", "Noviembre", "Diciembre"];
    return months[monthIndex];
  }

  isSameDay(date1: Date | undefined, date2: Date): boolean {
    if (!date1) {
      return false;
    }
    return date1.getDate() === date2.getDate() && date1.getMonth() === date2.getMonth() && date1.getFullYear() === date2.getFullYear();
  }

  selectDate(date: Date) {
    this.selectedDate = date;

    if (this.selectedDate) {
      const day = this.selectedDate.getDate();
      const month = this.selectedDate.getMonth() + 1;
      const year = this.selectedDate.getFullYear();
      const formattedDate = `${day.toString().padStart(2, '0')}/${month.toString().padStart(2, '0')}/${year}`;
      this.selectedDateFormatted = formattedDate;
    }
  }

  changeMonth(step: number) {
    this.currentMonthIndex += step;
    if (this.currentMonthIndex > 11) {
      this.currentYear++;
      this.currentMonthIndex = 0;
    } else if (this.currentMonthIndex < 0) {
      this.currentYear--;
      this.currentMonthIndex = 11;
    }
    this.generateDays();
  }
}
