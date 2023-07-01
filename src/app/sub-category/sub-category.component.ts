import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-sub-category',
  templateUrl: './sub-category.component.html',
  styleUrls: ['./sub-category.component.css']
})
export class SubCategoryComponent {

  categories = [
    { 
      "id": 1, 
      "service": "Bath & Brush",
      "description": "Bath + Dry + Brush + Nail Trim + Ear Cleaning + Cologne",
      "prices": { "small": 550, "large": 600 }
    },
    { 
      "id": 2, 
      "service": "Bath & Trim",
      "description": "Bath & Brush + Basic trimming on face, paws, & sanitary area",
      "prices": { "small": 550, "large": 600 }
    },
    { 
      "id": 3, 
      "service": "Full Groom",
      "description": "Bath & Trim + Toothbrush + Clipper / Scissor Work",
      "prices": { "small": 800, "large": 1000 }
    },
    { 
      "id": 4, 
      "service": "Puppy Package",
      "description": "Bath & Brush for puppies under 5 months old",
      "prices": {"small": 450}
    }
  ];

  constructor(private router: Router, private route: ActivatedRoute) { }

  onSelect(category: { service: string; }) {
    this.router.navigate([category.service], {relativeTo: this.route});
  }

  goBack() {
    this.router.navigate(['../'], {relativeTo: this.route});
  }
}
