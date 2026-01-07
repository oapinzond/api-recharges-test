import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { PassportModule } from '@nestjs/passport';
import { ThLoggerService } from 'themis';

import { TOKENS } from '../../shared/constants/tokens';
import { envs } from '../../config/envs.config';

import { AuthController } from './interface/controllers/auth.controller';
import { LoginUserUseCase } from './application/use-cases/login-user.use-case';
import { AuthDomainService } from './domain/services/auth-domain.service';
import { InMemoryUserRepository } from './infrastructure/repositories/in-memory-user.repository';
import { JwtTokenService } from './infrastructure/services/jwt-token.service';
import { JwtStrategy } from './infrastructure/strategies/jwt.strategy';

@Module({
  imports: [
    PassportModule,
    JwtModule.register({
      secret: envs.jwtSecret,
      signOptions: { expiresIn: envs.expiresIn }
    })
  ],
  controllers: [AuthController],
  providers: [
    // Domain Services
    AuthDomainService,

    // Use Cases
    LoginUserUseCase,

    // Infrastructure -> Domain Binding
    {
      provide: TOKENS.USER_REPOSITORY,
      useClass: InMemoryUserRepository
    },
    {
      provide: TOKENS.TOKEN_SERVICE,
      useClass: JwtTokenService
    },

    // Strategies
    JwtStrategy,

    // Logger
    ThLoggerService
  ],
  exports: []
})
export class AuthModule {}
