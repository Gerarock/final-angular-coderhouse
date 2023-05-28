import { ComponentFixture, TestBed } from '@angular/core/testing';
import { LoginComponent } from './login.component';
import { AuthService } from '../../services/auth.service';

describe('LoginComponent', () => {
  let component: LoginComponent;
  let fixture: ComponentFixture<LoginComponent>;
  let authService: AuthService;

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('El formulario debe ser invalido si la contraseña no ha sido ingresada', () => {
    component.passwordControl.setValue(null);
    expect(component.loginForm.invalid).toBe(true);
  });

  it('Debe llamarse al metodo login de AuthServicse si el formulario es valido en el metodo onSubmit', () => {
    const spyOnAuthServiceLogin = spyOn(authService, 'login');
    component.loginForm.setValue({ user: 'test@mail.com', password: '123456' });
    component.onSubmit();
    expect(spyOnAuthServiceLogin).toHaveBeenCalled();
  });

});
