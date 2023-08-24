import { Component, HostListener } from '@angular/core';

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

  @HostListener('document:click', ['$event'])
  onClick(event: MouseEvent) {
    console.log('click');
    console.log('event.target ', event.target);
    const timeList = document.getElementsByClassName('time-list')[0];
    const input = document.getElementsByClassName('time-input')[0];
    const arrowIcon = document.getElementsByClassName('arrow-icon');

    if (event.target === input || Array.from(arrowIcon).some(e => e.contains(event.target as Node))) {
      this.showTimeList = !this.showTimeList;
      return;
    }

    this.showTimeList = (event.target === timeList) ? true : false;
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

  selectTimeRange(index: number) {
    this.selectedTimeIndex = index;
    this.selectedTimeRange = this.timeRanges[index];
  }
}
