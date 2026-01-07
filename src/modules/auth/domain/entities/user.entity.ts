import { Name } from '../value-objects/name.vo';
import { Password } from '../value-objects/password.vo';

export class User {
  constructor(
    private readonly id: string,
    private readonly name: Name,
    private readonly password: Password
  ) {}

  getId(): string {
    return this.id;
  }

  getName(): string {
    return this.name.getValue();
  }

  // Método para verificar el password, lógica del dominio
  validatePassword(password: string): boolean {
    return password === this.password.getValue();
  }
}
