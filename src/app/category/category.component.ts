import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { DataService } from '../data.service';

@Component({
  selector: 'app-category',
  templateUrl: './category.component.html',
  styleUrls: ['./category.component.css']
})
export class CategoryComponent implements OnInit {

  categories = [
    { 
      "id": 1, 
      "service": "Pet Check-up",
      "description": "Use mock api here"
    },
    { 
      "id": 2, 
      "service": "Bath & Grooming",
      "description": "Our grooming services are available a la carte or bundle to get your pets looking their best."
    },
    { 
      "id": 3, 
      "service": "Pet Hotel / Lodging",
      "description": "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Malesuada vitae vitae sem tortor."
    },
  ]

  constructor(private router: Router, private route: ActivatedRoute, private _dataService: DataService) { }

  ngOnInit(): void {
      
  }

  onSelect(category: { id: number, service: string; }) {
    if (category.id === 2) {
      this._dataService.setService(category.service);
      this.router.navigate([category.id], {relativeTo: this.route});
    } else {
      this.router.navigate([`${category.id}/page-not-found`], {relativeTo: this.route} );
    }
  }
}
