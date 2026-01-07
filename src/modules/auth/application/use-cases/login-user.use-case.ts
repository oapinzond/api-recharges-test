import { Inject, Injectable } from '@nestjs/common';
import { ThLogger, ThLoggerService, ThStandardResponse, ThLoggerComponent } from 'themis';

import { TOKENS } from 'src/shared/constants/tokens';

import type { ITokenService } from '../contracts/services/token-service.contract';
import { LoginUserDto } from '../dto/login-user.dto';
import { AuthDomainService } from '../../domain/services/auth-domain.service';

@Injectable()
export class LoginUserUseCase {
  private readonly logger: ThLogger;

  constructor(
    @Inject(TOKENS.TOKEN_SERVICE) private readonly tokenService: ITokenService,
    private readonly authDomainService: AuthDomainService,
    private readonly loggerService: ThLoggerService
  ) {
    this.logger = this.loggerService.getLogger(LoginUserUseCase.name, ThLoggerComponent.APPLICATION);
  }

  async execute(dto: LoginUserDto): Promise<ThStandardResponse<{ accessToken: string }>> {
    const user = await this.authDomainService.validate(dto.username, dto.password);
    this.logger.log(`Generando token de autenticacion para el usuario: ${dto.username}`);
    const payload = { username: user.getName(), sub: user.getId() };
    return {
      code: 100,
      message: 'Exitoso',
      data: {
        accessToken: this.tokenService.sign(payload)
      }
    };
  }
}
