import { Inject, Injectable, UnauthorizedException } from '@nestjs/common';
import { ThLogger, ThLoggerComponent, ThLoggerService } from 'themis';

import { TOKENS } from 'src/shared/constants/tokens';

import type { IUserRepository } from '../repositories/user.repository';
import { User } from '../entities/user.entity';

@Injectable()
export class AuthDomainService {
  private readonly logger: ThLogger;

  constructor(
    @Inject(TOKENS.USER_REPOSITORY) private readonly userRepository: IUserRepository,
    private readonly loggerService: ThLoggerService
  ) {
    this.logger = this.loggerService.getLogger(AuthDomainService.name, ThLoggerComponent.SERVICE);
  }

  // Valida si el nombre de usuario y password son válidos (reglas de negocio)
  async validate(username: string, password: string): Promise<User> {
    const user = await this.userRepository.findByName(username);

    if (!user) {
      const error = new UnauthorizedException('Usuario no existe');
      this.logger.error('Error al verificar los datos. Usuario no existe', error);
      throw error;
    }

    if (!user.validatePassword(password)) {
      const error = new UnauthorizedException('Password incorrecto');
      this.logger.error('Error al verificar los datos. Password incorrecto', error);
      throw error;
    }

    return user;
  }
}
