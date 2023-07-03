import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'Petzania Animal Clinic';
  address = 'BGC Taguig';

  constructor(private router: Router) {}

  goHome() {
    localStorage.clear();
    this.router.navigate(['']);
  }
}
