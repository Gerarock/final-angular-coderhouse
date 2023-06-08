import { Component, OnDestroy } from '@angular/core';
import { AuthService } from '../../auth/services/auth.service';
import { Observable, Subject, map } from 'rxjs';
import { User } from 'src/app/core/models/user.model';
import { InscriptionsService } from '../../inscriptions/services/inscriptions.service';
import links, { NavItem } from '../nav-items';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnDestroy{

  authUser$: Observable<User | null>;
  destroyed$ = new Subject<void>();
  links = links;

  constructor(
    private authService: AuthService
  ) {
    this.authUser$ = this.authService.obtenerUsuarioAutenticado()
  }

  showFiller = false;

  verifyRole(link: NavItem): Observable<boolean> {
    return this.authUser$.pipe(
      map((usuarioAuth) =>
        link.allowedRoles.some((r) => r === usuarioAuth?.role) // true | false
      )
    );
  }

  logout() {
    this.authService.logout();
  }

  ngOnDestroy(): void {
    this.destroyed$.next();
    this.destroyed$.complete();
  }

}
