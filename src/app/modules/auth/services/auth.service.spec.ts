import { TestBed } from '@angular/core/testing';
import { AuthService, LoginFormValue } from './auth.service';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { Router } from '@angular/router';
import { skip } from 'rxjs';
import { environment } from 'src/environments/environment';
 

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

});
