import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Observable, BehaviorSubject, map, catchError, of } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { User } from 'src/app/core/models/user.model';

export interface LoginFormValue {
  user: string;
  password: string;
}

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private authUser$ = new BehaviorSubject<User | null>(null);

  constructor(
    private router: Router,
    private httClient: HttpClient
  ) { }

  obtenerUsuarioAutenticado(): Observable<User | null> {
    return this.authUser$.asObservable();
  }

  login(formValue: LoginFormValue): void {
    this.httClient.get<User[]>(
      `${environment.apiBaseUrl}/usuarios`,
      {
        params: {
          ...formValue
        }
      }
    ).subscribe({
      next: (usuarios) => {
        const usuarioAutenticado = usuarios[0];
        if (usuarioAutenticado) {
          localStorage.setItem('token', usuarioAutenticado.token);
          localStorage.setItem('auth-user', JSON.stringify(usuarioAutenticado));
          this.authUser$.next(usuarioAutenticado);
          this.router.navigate(['dashboard']);
        } else {
          alert('¡Usuario o contraseña incorrectos!');
        }
      }
    });
  }

  logout(): void {
    localStorage.removeItem('token');
    localStorage.removeItem('auth-user');
    this.authUser$.next(null);
    this.router.navigate(['login']);
  }

  verificaToken(): Observable<boolean> {
    const token = localStorage.getItem('token');
    return this.httClient.get<User[]>(
      `${environment.apiBaseUrl}/usuarios?token=${token}`,
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
            this.authUser$.next(usuarioAutenticado);
          }
          return !!usuarioAutenticado;
        }),
        catchError((err) => {
          return of(false);
        })
      );
  }
}