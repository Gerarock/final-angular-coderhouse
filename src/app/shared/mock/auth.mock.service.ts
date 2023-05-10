import { BehaviorSubject } from "rxjs";
import { User } from "src/app/core/models/user.model";

export const USUARIO_ADMIN_MOCK: User = {
  id: 1,
  nombre: 'testnombre',
  apellido: 'testapellido',
  role: 'admin',
  user: 'test@mail.com',
  token: 'asdkjsanfkdams3u2hjdasfadsuh',
}

export class AuthMockService {
  private authUser$ = new BehaviorSubject<User | null>(null);

  login() {
    this.authUser$.next(USUARIO_ADMIN_MOCK);
  }
}
