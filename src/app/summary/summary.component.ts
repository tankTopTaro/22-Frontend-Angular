import { Component, OnInit } from '@angular/core';
import { DataService } from '../data.service';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-summary',
  templateUrl: './summary.component.html',
  styleUrls: ['./summary.component.css']
})
export class SummaryComponent implements OnInit {
  details_name: string = '';
  details_phone: string = '';
  details_email: string = '';
  details_comments: string = '';
  details_timeslot: string | null = null;
  details_date: string | null = null;
  details_service: string = '';
  details_selectedService: string = '';
  
  constructor(private router: Router, private route: ActivatedRoute, public _dataService: DataService) {
    this.details_service = this._dataService.details_service;
    this.details_selectedService = this._dataService.details_selectedService;
    this.details_date = this._dataService.details_date;
    this.details_timeslot = this._dataService.details_timeslot;
    this.details_name = this._dataService.details_name;
    this.details_phone = this._dataService.details_phone;
    this.details_email = this._dataService.details_email;
    this.details_comments = this._dataService.details_comments;
  }

  ngOnInit(): void {
      
  }

  book() {

  }

  goBack() {
    const mainId = this.route.snapshot.paramMap.get('mainId');
    const subId = this.route.snapshot.paramMap.get('subId');
    const targetUrl = `/category/${mainId}/${subId}/details-form`;
    this.router.navigate([targetUrl], { relativeTo:this.route, });
  }
}
