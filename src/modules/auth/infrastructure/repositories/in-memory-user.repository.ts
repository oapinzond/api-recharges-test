import { Injectable } from '@nestjs/common';

import { IUserRepository } from '../../domain/repositories/user.repository';
import { User } from '../../domain/entities/user.entity';
import { Name } from '../../domain/value-objects/name.vo';
import { Password } from '../../domain/value-objects/password.vo';

@Injectable()
export class InMemoryUserRepository implements IUserRepository {
  // Usuarios hardcodeados en memoria
  private readonly users: User[] = [
    new User('1', new Name('pruebasuno'), new Password('Colombia2025')),
    new User('2', new Name('pruebasdos'), new Password('Bogota20_')),
    new User('3', new Name('pruebastres'), new Password('Test25%'))
  ];

  async findByName(username: string): Promise<User | null> {
    const user = this.users.find((u) => u.getName() === username);
    return Promise.resolve(user || null);
  }
}
