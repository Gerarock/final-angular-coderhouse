import { TestBed } from '@angular/core/testing';
import { AuthService, LoginFormValue } from './auth.service';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { Router } from '@angular/router';
import { skip } from 'rxjs';
import { environment } from 'src/environments/environment';
import { USUARIO_ADMIN_MOCK } from 'src/app/shared/mock/auth.mock.service';

describe('AuthService', () => {
  let service: AuthService;
  let httpController: HttpTestingController;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        HttpClientTestingModule,
        RouterTestingModule
      ]
    }).compileComponents();

    service = TestBed.inject(AuthService);
    httpController = TestBed.inject(HttpTestingController);
  });

  it('El metodo login debe retornar ok', (done) => {
    const mockPayload: LoginFormValue = {
      user: 'test',
      password: 'test@mail.com'
    };

    spyOn(TestBed.inject(Router), 'navigate').and.stub();

    service.obtenerUsuarioAutenticado()
      .pipe(skip(1))
      .subscribe({
        next: (usuario) => {
          expect(usuario).toBeTruthy();
          done();
        },
      })

    service.login(mockPayload);

    httpController.expectOne({
      url: `${environment.apiBaseUrl}/usuarios?user=${mockPayload.user}&password=${mockPayload.password}`,
      method: 'GET',
    }).flush([
      USUARIO_ADMIN_MOCK
    ])
  });

});
