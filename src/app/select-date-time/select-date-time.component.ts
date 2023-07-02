import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-select-date-time',
  templateUrl: './select-date-time.component.html',
  styleUrls: ['./select-date-time.component.css']
})
export class SelectDateTimeComponent implements OnInit {

  service: string ='';
  selectedService: string = '';
  dates: { month: string, date: number, day: string }[] = [];
  currentDateIndex: number = -1;

  constructor(private router: Router, private route: ActivatedRoute) { 
    /* const currentDate = new Date();
    const year = currentDate.getFullYear();
    const month = currentDate.getMonth();
    const daysInMonth = new Date(year, month + 1, 0).getDate();

    this.dates = Array.from({ length: daysInMonth }, (_, i) => {
      const date = i + 1;
      const dateObj = new Date(year, month, date);
      const monthFormatter = new Intl.DateTimeFormat('en-US', { month: 'short' });
      const dayFormatter = new Intl.DateTimeFormat('en-US', { weekday: 'long' });

      return { 
        month: monthFormatter.format(dateObj),
        date,
        day: dayFormatter.format(dateObj)
      };
    }) */
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
      console.log(this.dates);
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
}
