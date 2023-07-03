import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { DataService } from '../data.service';

@Component({
  selector: 'app-sub-category',
  templateUrl: './sub-category.component.html',
  styleUrls: ['./sub-category.component.css']
})
export class SubCategoryComponent implements OnInit {

  public selectedService: string = '';
  public showRouterOutlet: boolean = false;

  subcategories = [
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

  constructor(private router: Router, private route: ActivatedRoute, public _dataService: DataService) { }

  ngOnInit(): void {
    this.route.queryParams.subscribe(params => {
      this.showRouterOutlet = false;
    })
  }

  // Select Date Page
  setDate(subcategory: { id: number, service: string; }) {
    const categoryId = this.route.snapshot.paramMap.get('mainId');
    const targetUrl = `/category/${categoryId}/${subcategory.id}/select-date`;

    this.showRouterOutlet = true;
    this._dataService.setSelectedService(subcategory.service);

    this.router.navigate([targetUrl], {
      relativeTo: this.route
    })
  }
}
