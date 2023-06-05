import { Component } from '@angular/core';
import { AuthService } from '../../auth/services/auth.service';
import { Observable } from 'rxjs';
import { User } from 'src/app/core/models/user.model';
import { InscriptionsService } from '../../inscriptions/services/inscriptions.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent {

  authUser$: Observable<User | null>;

  constructor(
    private authService: AuthService
  ) { 
    this.authUser$ = this.authService.obtenerUsuarioAutenticado()
  }

  showFiller = false;

  logout() {
    this.authService.logout();
  }

}
