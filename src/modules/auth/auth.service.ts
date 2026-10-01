import { Inject, Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';
import { Database, DATABASE } from 'src/database/database.provider';
import { LoginDto } from './dto/login.dto';

@Injectable()
export class AuthService {
  constructor(
    @Inject(DATABASE)
    private readonly db: Database,
  ) {}

//   async validateUser(email: string, password: string): Promise<User | null> {
//     return this.userService.validateUser(email, password);
//   }

  async validateUser(email: string, password: string) {
    const user = await this.db.query.users.findFirst({
        where: { email },
    });

    if (!user) {
        throw new UnauthorizedException('User not found.');
    }

    const isPasswordValid = await bcrypt.compare(password, user.password);

    if (!isPasswordValid) {
        throw new UnauthorizedException('Invalid password');
    }

    return user;
  }

  async login(dto: LoginDto) {
    const { email, password } = dto;

    await this.validateUser(email, password);

    return {
        status: 'success',
        message: 'Login successfully',
    }
  }

//   async register(email: string, password: string) {
//     return this.userService.create(email, password);
//   }

//   async validateUserById(id: number): Promise<User | null> {
//     return this.userService.findById(id);
//   }
}
