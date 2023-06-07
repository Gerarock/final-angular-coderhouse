import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable, map } from 'rxjs';
import { AuthService } from 'src/app/modules/auth/services/auth.service';


@Injectable({
  providedIn: 'root'
})
export class AdminGuard implements CanActivate {
  constructor(private authService: AuthService) { }

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {

    return this.authService.obtenerUsuarioAutenticado()
      .pipe(
        map((userAuth) => {
          if (userAuth?.role !== 'administrador') {
            alert('No puede acceder por falta de permisos')
            return false;
          } else {
            return true;
          }
        })
      )
  }

}
