import { Component } from '@angular/core';

@Component({
  selector: 'app-calendario-horario',
  templateUrl: './calendario-horario.component.html',
  styleUrls: ['./calendario-horario.component.css']
})
export class CalendarioHorarioComponent {
  timeRanges: string[] = [];
  selectedTimeIndex: number = -1;
  selectedTimeRange: string = '';
  showTimeList: boolean = false;

  constructor() {
    this.generateTimeRanges();
  }

  generateTimeRanges() {
    const startHour = 8;
    const endHour = 18;
    for (let hour = startHour; hour < endHour; hour++) {
      for (let minute = 0; minute < 60; minute += 30) {
        const startTime = `${hour.toString().padStart(2, '0')}:${minute.toString().padStart(2, '0')}`;
        const endTime = `${(hour + (minute === 30 ? 1 : 0)).toString().padStart(2, '0')}:${(minute === 30 ? '00' : '30')}`;
        this.timeRanges.push(`${startTime} - ${endTime}`);
      }
    }
  }

  toggleTimeList() {
    this.showTimeList = !this.showTimeList;
  }

  selectTimeRange(index: number) {
    this.selectedTimeIndex = index;
    this.selectedTimeRange = this.timeRanges[index];
    this.showTimeList = false;
  }
}
