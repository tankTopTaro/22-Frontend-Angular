import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
/* import { DataService } from '../data.service'; */

@Component({
  selector: 'app-select-date-time',
  templateUrl: './select-date-time.component.html',
  styleUrls: ['./select-date-time.component.css']
})
export class SelectDateTimeComponent implements OnInit {

  timeslots = {
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
  };
  

  service: string ='';
  selectedService: string = '';
  dates: { month: string, date: number, day: string }[] = [];
  currentDateIndex: number = -1;

  disableButton: boolean = true;

  /* _data: any[] = []; */

  constructor(private router: Router, private route: ActivatedRoute, /* private _dataService: DataService */) { 
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

  ngOnInit(): void {
      this.route.queryParams.subscribe(params => {
        this.selectedService = params['selectedService'];
        this.service = params['service'];
      })
      
      // Mock API
      /* this._dataService.fetchData().subscribe((data) => {
        this._data = data
      }) */
  }

  goBack() {
    this.router.navigate(['../../'], { relativeTo:this.route, queryParams: {service: this.service} });
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
}
