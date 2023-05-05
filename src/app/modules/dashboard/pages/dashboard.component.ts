import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent {

  constructor(private router: Router) { }
  
  showFiller = false;

  navigate(value: string) {
    switch (value) {
      case 'listAlumn':
        this.router.navigate(['students']);
        break;
      case 'cardAlumn':
        this.router.navigate(['/cards']);
        break;
    }
  }

}
