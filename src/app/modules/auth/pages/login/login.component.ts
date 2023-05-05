import { Component } from '@angular/core';
import { Validators, FormControl, FormGroup } from '@angular/forms';
import { AuthService, LoginFormValue } from '../../services/auth.service';

@Component({
    selector: 'app-login',
    templateUrl: './login.component.html',
    styleUrls: ['./login.component.scss']
})
export class LoginComponent {

    userControl = new FormControl('', [Validators.required]);
    passwordControl = new FormControl('', [Validators.required]);

    loginForm = new FormGroup({
        user: this.userControl,
        password: this.passwordControl,
    });

    constructor(private authService: AuthService) { }

    onSubmit(): void {
        if (this.loginForm.invalid) {
            this.loginForm.markAllAsTouched();
        } else {
            this.authService.login(this.loginForm.value as LoginFormValue)
        }
    }
}