import { Body, Controller, Post, UseGuards, Get } from '@nestjs/common';
import { ThLogger, ThLoggerService, ThStandardResponse, ThLoggerComponent } from 'themis';

import { LoginUserUseCase } from '../../application/use-cases/login-user.use-case';
import { LoginUserDto } from '../../application/dto/login-user.dto';
import { JwtAuthGuard } from '../guards/jwt-auth.guard';

@Controller('auth')
export class AuthController {
  private readonly logger: ThLogger;

  constructor(
    private readonly loginUseCase: LoginUserUseCase,
    private readonly loggerService: ThLoggerService
  ) {
    this.logger = this.loggerService.getLogger(AuthController.name, ThLoggerComponent.CONTROLLER);
  }

  @Post('login')
  async login(@Body() loginDto: LoginUserDto): Promise<ThStandardResponse<{ accessToken: string }>> {
    this.logger.log(`Recibiendo petición de login con nombre de usuario: ${loginDto.username}`);
    return this.loginUseCase.execute(loginDto);
  }

  // Endpoint de prueba protegido
  @UseGuards(JwtAuthGuard)
  @Get('profile')
  getProfile(): { message: string; status: string } {
    return { message: 'Este es un dato protegido', status: 'ok' };
  }
}
