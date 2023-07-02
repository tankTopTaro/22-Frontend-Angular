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

  constructor(private router: Router, private route: ActivatedRoute) { 
    const currentDate = new Date();
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
    })
  }

  ngOnInit(): void {
      this.route.queryParams.subscribe(params => {
        this.selectedService = params['selectedService'];
        this.service = params['service'];
      })
  }

  goBack() {
    this.router.navigate(['../../'], { relativeTo:this.route, queryParams: {service: this.service} });
  }
}
