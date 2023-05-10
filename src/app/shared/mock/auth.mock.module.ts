import { TestModuleMetadata } from "@angular/core/testing";
import { HttpClientTestingModule } from "@angular/common/http/testing";
import { MatInputModule } from "@angular/material/input";
import { MatFormFieldModule } from "@angular/material/form-field";
import { RouterTestingModule } from "@angular/router/testing";
import { ReactiveFormsModule } from "@angular/forms";
import { PipesModule } from "src/app/shared/pipes/pipes.module";
import { BrowserAnimationsModule } from "@angular/platform-browser/animations";
import { CommonModule } from "@angular/common";
import { MockProvider } from 'ng-mocks';
import { LoginComponent } from "src/app/modules/auth/pages/login/login.component";
import { AuthService } from "src/app/modules/auth/services/auth.service";
import { MatCardModule } from "@angular/material/card";

export const AuthMockModule: TestModuleMetadata = {
  declarations: [
    LoginComponent
  ],
  imports: [
    CommonModule,
    BrowserAnimationsModule,
    RouterTestingModule,
    MatFormFieldModule,
    MatInputModule,
    HttpClientTestingModule,
    ReactiveFormsModule,
    MatCardModule,
    PipesModule,
  ],
  providers: [
    MockProvider(AuthService),
  ]
}
