import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { DataService } from '../data.service';

@Component({
  selector: 'app-details-form',
  templateUrl: './details-form.component.html',
  styleUrls: ['./details-form.component.css']
})
export class DetailsFormComponent {

  constructor(private router: Router, private route: ActivatedRoute, public _dataService: DataService) {}

  goBack() {
    const mainId = this.route.snapshot.paramMap.get('mainId');
    const subId = this.route.snapshot.paramMap.get('subId');
    const targetUrl = `/category/${mainId}/${subId}/select-date`;
    this.router.navigate([targetUrl], { relativeTo:this.route, });
  }
}
