import { TestBed, inject } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { StoreModule } from '@ngrx/store';
import { AuthService, LoginFormValue } from './auth.service';
import { User } from 'src/app/core/models/user.model';
import { environment } from 'src/environments/environment';
import { Router } from '@angular/router';

describe('AuthService', () => {
  let service: AuthService;
  let httpMock: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [
        HttpClientTestingModule,
        RouterTestingModule,
        StoreModule.forRoot({}),
      ],
      providers: [AuthService],
    });

    service = TestBed.inject(AuthService);
    httpMock = TestBed.inject(HttpTestingController);
  });

  afterEach(() => {
    httpMock.verify();
  });

  it('should log in a user', inject(
    [AuthService, HttpTestingController],
    (authService: AuthService, httpMock: HttpTestingController) => {
      const formValue: LoginFormValue = {
        id: 1,
        nombre: 'test',
        apellido: 'test',
        email: 'test@gmail.com',
        password: 'test',
        token: 'test',
        role: 'test',
      };

      const mockUser: User = {
        id: 1,
        nombre: 'test',
        apellido: 'test',
        email: 'teste@gmail.com',
        password: 'test',
        token: 'test',
        role: 'test',
      };

      spyOn(service, 'establecerUsuarioAutenticado');

      service.login(formValue);

      const req = httpMock.expectOne(`${environment.apiBaseUrl}/users?email=johndoe@example.com&password=password`);
      expect(req.request.method).toBe('GET');
      req.flush([mockUser]);
      expect(localStorage.getItem('token')).toBe('token');
      expect(service.establecerUsuarioAutenticado).toHaveBeenCalledWith(mockUser, 'token');
      const routerSpy = spyOn(TestBed.inject(Router), 'navigate');
      expect(routerSpy).toHaveBeenCalledWith(['dashboard']);
    }
  ));

});
