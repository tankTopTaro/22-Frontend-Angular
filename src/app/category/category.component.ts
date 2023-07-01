import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

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
      "description": "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Malesuada vitae vitae sem tortor."
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

  constructor(private router: Router, private route: ActivatedRoute) { }

  ngOnInit(): void {
      
  }

  onSelect(category: { service: string; }) {
    if (category.service === "Bath & Grooming") {
      this.router.navigate([category.service], {relativeTo: this.route});
    } else {
      this.router.navigate(['/page-not-found'], );
    }
  }
}
