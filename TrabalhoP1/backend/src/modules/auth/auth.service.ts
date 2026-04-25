import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';

import { UsersService } from '../users/users.service';

@Injectable()
export class AuthService {
  constructor(
    private usersService: UsersService,
    private jwtService: JwtService,
  ) { }

  async validateUser(email: string, password: string) {
    const user = await this.usersService.findByEmail(email);

    if (!user) {
      throw new UnauthorizedException('Usuário não encontrado');
    }

    const hashedPassword = user.getDataValue('password');

    console.log('PASSWORD DO BANCO:', hashedPassword);
    console.log('PASSWORD INPUT:', password);

    const passwordMatch = await bcrypt.compare(password, hashedPassword);

    if (!passwordMatch) {
      throw new UnauthorizedException('Senha inválida');
    }

    return user;
  }


  async login(email: string, password: string) {
    const user = await this.validateUser(email, password);

    const payload = {
      sub: user.id,
      email: user.email,
      role: user.role,
      barbershopId: user.barbershopId,
    };

    return {
      access_token: this.jwtService.sign(payload),
    };
  }

}