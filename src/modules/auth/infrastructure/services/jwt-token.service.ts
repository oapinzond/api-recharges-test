import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';

import { ITokenService } from '../../application/contracts/services/token-service.contract';

@Injectable()
export class JwtTokenService implements ITokenService {
  constructor(private readonly jwtService: JwtService) {}

  sign(payload: any): string {
    return this.jwtService.sign(payload);
  }
}
