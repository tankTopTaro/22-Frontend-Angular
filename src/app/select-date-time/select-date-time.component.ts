import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { DataService } from '../data.service';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-select-date-time',
  templateUrl: './select-date-time.component.html',
  styleUrls: ['./select-date-time.component.css']
})
export class SelectDateTimeComponent implements OnInit {

  /* timeslots = {
    time: [
      {
        "time": 46800000,
        "slots": 1,
        "hmsFormat": {
          "days": 0,
          "hours": 13,
          "minutes": 0,
          "seconds": 0
        }
      },
      {
        "time": 50400000,
        "slots": 1,
        "hmsFormat": {
          "days": 0,
          "hours": 14,
          "minutes": 0,
          "seconds": 0
        }
      },
      {
        "time": 54000000,
        "slots": 1,
        "hmsFormat": {
          "days": 0,
          "hours": 15,
          "minutes": 0,
          "seconds": 0
        }
      },
      {
        "time": 57600000,
        "slots": 1,
        "hmsFormat": {
          "days": 0,
          "hours": 16,
          "minutes": 0,
          "seconds": 0
        }
      },
      {
        "time": 61200000,
        "slots": 1,
        "hmsFormat": {
          "days": 0,
          "hours": 17,
          "minutes": 0,
          "seconds": 0
        }
      },
      {
        "time": 64800000,
        "slots": 1,
        "hmsFormat": {
          "days": 0,
          "hours": 18,
          "minutes": 0,
          "seconds": 0
        }
      },
      {
        "time": 68400000,
        "slots": 1,
        "hmsFormat": {
          "days": 0,
          "hours": 19,
          "minutes": 0,
          "seconds": 0
        }
      }
    ]
  }; */
  

  service: string ='';
  selectedService: string = '';
  dates: { month: string, date: number, day: string }[] = [];
  currentDateIndex: number = -1;
  currentMonth: number = 0;
  selectedDate: Date | null = null;
  selectedTimeslot: any;

  disableButton: boolean = true;
  isLoading: boolean = true;

  _data: any[] = [];
  _timeslots: any[] = [];
  morningTimeslots: any[] = [];
  afternoonTimeslots: any[] = [];
  eveningTimeslots: any[] = [];

  calendar: { month: string, dates: { month: string, date: number, day: string }[], days: string[], year: number }[] = [];

  constructor(private router: Router, private route: ActivatedRoute, public _dataService: DataService, private modalService: NgbModal) { 
    const currentDate = new Date();
    this.currentMonth = currentDate.getMonth();

    console.log(this.calendar)
  }

  ngOnInit(): void {  
      // Mock API
    this._dataService.fetchData().subscribe((data) => {
        this.isLoading = false;
        this._data = data;
        this.generateDatesArray();
        this.generateCalendar();
        this.extractTimeslots();
        this.convertTo24HourFormat(this.afternoonTimeslots);
        this.convertTo24HourFormat(this.eveningTimeslots);
        this.getMorningSlots();
        this.getAfternoonSlots();
        this.getEveningSlots();
      }, 
      error => {
        console.error('Error fetching data:', error);
        this.isLoading = false;
      }
    );
  }

  generateDatesArray() {
    const currentDate = new Date();
    const year = currentDate.getFullYear();
    const currentMonth = currentDate.getMonth();
    const currentDateValue = currentDate.getDate();

    for (let month = currentMonth; month < 12; month++) {
      const startDay = (month === currentMonth) ? currentDateValue : 1;
      const daysInMonth = new Date(year, month + 1, 0).getDate();

      for (let date = startDay; date <= daysInMonth; date++) {
        const dateObj = new Date(year, month, date);
        const monthFormatter = new Intl.DateTimeFormat('en-US', { month: 'short' });
        const dayFormatter = new Intl.DateTimeFormat('en-US', { weekday: 'long' });

        const currentDate = {
          month: monthFormatter.format(dateObj),
          date,
          day: dayFormatter.format(dateObj)
        };

        this.dates.push(currentDate);

        if (month === currentMonth && date === currentDateValue) {
          this.currentDateIndex = this.dates.length - 1;
        }
      }
    }
  }

  generateCalendar() {
    const currentDate = new Date();
    const year = currentDate.getFullYear();
    const currentMonth = 0;
    const currentDateValue = currentDate.getDate();

    for (let month = currentMonth; month < 12; month++) {
      const startDay = 1;
      const daysInMonth = new Date(year, month + 1, 0).getDate();

      const monthObj: { month: string, dates: { month: string, date: number, day: string }[], days: string[], year: number } = {
        month: '',
        dates: [],
        days: [],
        year: year
      };

      for (let date = startDay; date <= daysInMonth; date++) {
        const dateObj = new Date(year, month, date);
        const monthFormatter = new Intl.DateTimeFormat('en-US', { month: 'long' });
        const dayFormatter = new Intl.DateTimeFormat('en-US', { weekday: 'short' });

        const currentDate = {
          month: monthFormatter.format(dateObj),
          date,
          day: dayFormatter.format(dateObj)
        };

        monthObj.month = currentDate.month;
        monthObj.dates.push(currentDate);

        if (!monthObj.days.includes(currentDate.day)) {
          monthObj.days.push(currentDate.day);
        }
      }

      if (monthObj.dates.length > 0) {
        monthObj.dates.sort((a, b) => a.date - b.date);
        this.calendar.push(monthObj);
      }
    }
  }

  openCalendar(content: any) {
		this.modalService.open(content, { centered: true });
	}

  nextMonth() {
    if (this.currentMonth < this.calendar.length - 1) {
      this.currentMonth++;
    }
  }

  prevMonth() {
    const currentDate = new Date();
    const thisMonth = currentDate.getMonth();

    if (this.currentMonth === thisMonth) {
      return;
    }

    this.currentMonth--;
  }

  selectDate(date: { month: string, date: number, day: string }) {
    const selectedDate = new Date(date.month + ' ' + date.date + ' ' + this.calendar[this.currentMonth].year);

    if (this.selectedDate && this.selectedDate?.getTime() === selectedDate.getTime()) {
      this.selectedDate = null;
    } else {
      this.selectedDate = selectedDate;
      this._dataService.setSelectedDate(selectedDate);
    }
  }

  isDateSelected(date: { month: string, date: number, day: string }): boolean {
    if (this.selectedDate) {
      return (
        this.selectedDate.getFullYear() === this.calendar[this.currentMonth].year &&
        this.selectedDate.getMonth() === this.currentMonth &&
        this.selectedDate.getDate() === date.date
      );
    }
    return false;
  }

  isDateDisabled(date: { month: string, date: number, day: string }): boolean {
    const currentDate = new Date();
    const selectedDate = new Date(date.month + ' ' + date.date + ', ' + this.calendar[this.currentMonth].year);

    currentDate.setHours(0, 0, 0, 0);
    selectedDate.setHours(0, 0, 0, 0);

    return selectedDate.getTime() < currentDate.getTime();
  }

  isToday(date: { month: string, date: number, day: string }): boolean {
    const currentDate = new Date();
    const selectedDate = new Date(date.month + ' ' + date.date + ', ' + this.calendar[this.currentMonth].year);

    currentDate.setHours(0, 0, 0, 0);

    return currentDate.getTime() === selectedDate.getTime();
  }

  getEmptyCells(day: string): any[] {
    const daysOfWeek = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
    const startIndex = daysOfWeek.indexOf(day);
    return Array(startIndex).fill(null);
  }

  sortDays(day: string): any[] {
    const daysOfWeek = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
    const startIndex = daysOfWeek.indexOf('Sun');

    if (startIndex > -1) {
      const sortedDays = [
        ...daysOfWeek.slice(startIndex),
        ...daysOfWeek.slice(0, startIndex)
      ];
      return sortedDays;
    }
    
    return [];
  }

  selectTimeslot(time: any) {
    this.selectedTimeslot = time;
    this._dataService.setSelectedTimeslot(time);
  }

  isTimeSelected(time: any): boolean {
    return this.selectedTimeslot === time;
  }

  isDateTimeSelected(): boolean {
    return this.selectedDate && this.selectedTimeslot;
  }

  extractTimeslots() {
    // Default
    /* const uniqueSlots = new Map();
    for (let day of this._data[0].operatingDays) {
      for (let timeslot of day.timeslot) {
        const timeKey = timeslot.hmsFormat.hours + ':' + timeslot.hmsFormat.minutes;
        uniqueSlots.set(timeKey, timeslot);
      }
    } 
    this._timeslots = Array.from(uniqueSlots.values());*/

    // Randomizer
    if (this._data.length > 0) {
      const randomId = Math.floor(Math.random() * this._data.length);
      const uniqueSlots = new Map();

      for (let day of this._data[randomId].operatingDays) {
        for (let timeslot of day.timeslot) {
          const timeKey = timeslot.hmsFormat.hours + ':' + timeslot.hmsFormat.minutes;
          uniqueSlots.set(timeKey, timeslot);
        }
      }
      this._timeslots = Array.from(uniqueSlots.values());
    }
  }

  convertTo24HourFormat(timeslots: any[]) {
    for (let time of timeslots) {
      if (time.hmsFormat.hours < 12 && time.hmsFormat.hours !== 0) {
        time.hmsFormat.hours +=12;
      }
    }
  }

  sortTimeslots(timeslots: any[]): any[] {
    const sortedSlots = [...timeslots];
    sortedSlots.sort((a, b) => {
      if (a.hmsFormat.hours === 12 && a.hmsFormat.minutes === 0) {
        return -1;
      }
      if (b.hmsFormat.hours === 12 && b.hmsFormat.minutes === 0) {
        return 1;
      }
      if (a.hmsFormat.hours === b.hmsFormat.hours) {
        return a.hmsFormat.minutes - b.hmsFormat.minutes;
      }
      return a.hmsFormat.hours - b.hmsFormat.hours;
    });
    return sortedSlots; 
  }

  getMorningSlots() {
    this.morningTimeslots = this._timeslots.filter(time => this.getAMPM(time.hmsFormat.hours) === 'AM');
  }

  getAfternoonSlots() {
    this.afternoonTimeslots = this._timeslots.filter(time => {
      return time.hmsFormat.hours >= 12 && time.hmsFormat.hours < 18;
    })
  }

  getEveningSlots() {
    this.eveningTimeslots = this._timeslots.filter(time => {
      return time.hmsFormat.hours >= 18 && time.hmsFormat.hours <= 23;
    })
  }

  isCurrentDay(date: { month: string, date: number, day: string}): boolean {
    const currentDate = new Date();
    return (
      date.month === currentDate.toLocaleString('en-US', { month: 'short' }) &&
      date.date === currentDate.getDate()
    );
  }

  isNextDay(date: { month: string, date: number, day: string }): boolean {
    const nextDate = new Date();
    nextDate.setDate(nextDate.getDate() + 1);
  
    return (
      date.month === nextDate.toLocaleString('en-US', { month: 'short' }) &&
      date.date === nextDate.getDate()
    );
  }

  isWeekend(date: { month: string, date: number, day: string}): boolean {
    const dayOfWeek = new Date(date.month + ' ' + date.date + ', ' + new Date().getFullYear()).getDay();
    return dayOfWeek === 0 || dayOfWeek === 6; 
  }

  // TIME
  formatTime(hours: number): number {
    return hours > 12 ? hours - 12 : hours;
  }

  getAMPM(hours: number): string {
    return hours >= 12 ? 'PM' : 'AM';
  }

  goBack() {
    this.router.navigate(['../../'], { relativeTo:this.route});
  }

  detailsForm() {
    const mainId = this.route.snapshot.paramMap.get('mainId');
    const subId = this.route.snapshot.paramMap.get('subId');
    const targetUrl = `/category/${mainId}/${subId}/details-form`;
    this.router.navigate([targetUrl], { relativeTo: this.route })
  }
}
