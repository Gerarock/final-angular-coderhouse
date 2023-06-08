import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Observable, map, catchError, of } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { User } from 'src/app/core/models/user.model';
import { Store } from '@ngrx/store';
import { AppState } from '../store';
import { selectAuthUser } from '../store/auth/auth.selectors';
import { EliminarUsuarioAutenticado, EstablecerUsuarioAutenticado } from '../store/auth/auth.actions';
export interface LoginFormValue {
  email: string;
  password: string;
}
@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(
    private router: Router,
    private httClient: HttpClient,
    private store: Store<AppState>
  ) { }

  obtenerUsuarioAutenticado(): Observable<User | null> {
    return this.store.select(selectAuthUser); //Retorna el Observable que selecciona el AuthUser en el Selector
  }

  establecerUsuarioAutenticado(usuario: User, token: string): void {    
    this.store.dispatch(EstablecerUsuarioAutenticado({ payload: { ...usuario, token } }));
  }

  login(formValue: LoginFormValue): void {
    console.log('form: ', formValue)
    this.httClient.get<User[]>(
      `${environment.apiBaseUrl}/users`,
      {
        params: {
          ...formValue
        }
      }
    ).subscribe({
      next: (usuarios) => {
        console.log('USUARIO: ', usuarios)
        const usuarioAutenticado = usuarios[0];
        if (usuarioAutenticado) {
          localStorage.setItem('token', usuarioAutenticado.token);
          this.establecerUsuarioAutenticado(usuarioAutenticado, usuarioAutenticado.token);
          this.router.navigate(['dashboard']);
        } else {
          alert('¡Usuario o contraseña incorrectos!');
        }
      }
    });
  }

  logout(): void {
    localStorage.removeItem('token');
    this.store.dispatch(EliminarUsuarioAutenticado());
    this.router.navigate(['auth', 'login']);
  }

  verificaToken(): Observable<boolean> {
    const token = localStorage.getItem('token');
    return this.httClient.get<User[]>(
      `${environment.apiBaseUrl}/users?token=${token}`,
      {
        headers: new HttpHeaders({
          'authorization': token || ''
        }),
      }
    )
      .pipe(
        map((usuarios) => {
          const usuarioAutenticado = usuarios[0];
          if (usuarioAutenticado) {
            localStorage.setItem('token', usuarioAutenticado.token);
            this.establecerUsuarioAutenticado(usuarioAutenticado, usuarioAutenticado.token);
          }
          return !!usuarioAutenticado;
        }),
        catchError((err) => {
          return of(false);
        })
      );
  }
}