import { User } from '../entities/user.entity';

export interface IUserRepository {
  findByName(name: string): Promise<User | null>;
}
