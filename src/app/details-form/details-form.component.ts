import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { DataService } from '../data.service';
import { Details } from '../details';

@Component({
  selector: 'app-details-form',
  templateUrl: './details-form.component.html',
  styleUrls: ['./details-form.component.css']
})
export class DetailsFormComponent {

  submitted: boolean = false;

  constructor(private router: Router, private route: ActivatedRoute, public _dataService: DataService) {}

  detailsModel = new Details(
    '', '', '', '', 
    this._dataService.selectedTimeslot, 
    this._dataService.selectedDate,
    this._dataService.service,
    this._dataService.selectedService
  );

  onSubmit() {
    this.submitted = true;
    this._dataService.submitDetails(this.detailsModel)

    const mainId = this.route.snapshot.paramMap.get('mainId');
    const subId = this.route.snapshot.paramMap.get('subId');
    const targetUrl = `/category/${mainId}/${subId}/summary`;
    this.router.navigate([targetUrl], { relativeTo:this.route,});
  }

  goBack() {
    const mainId = this.route.snapshot.paramMap.get('mainId');
    const subId = this.route.snapshot.paramMap.get('subId');
    const targetUrl = `/category/${mainId}/${subId}/select-date`;
    this.router.navigate([targetUrl], { relativeTo:this.route, });
  }
}
