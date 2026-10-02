import { BadRequestException, Inject, Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';
import { Database, DATABASE } from 'src/database/database.provider';
import { LoginDto } from './dto/login.dto';
import { users } from 'src/database/schema';
import { eq } from 'drizzle-orm';

@Injectable()
export class AuthService {
  constructor(
    @Inject(DATABASE)
    private readonly db: Database,
    private readonly jwtService: JwtService,
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

    if (user.is_active !== true) {
      throw new BadRequestException('Your account was deactivated.');
    }

    return user;
  }

  async login(dto: LoginDto) {
    const { email, password } = dto;

    const userValidate = await this.validateUser(email, password);

    const issuedAt = Math.floor(Date.now()/100);

    const payload = {
      userUUID: userValidate.id,
      tokenVersion: userValidate.token_version,
      userName: userValidate.username,
      issuedAt: issuedAt,
    };

    const token = this.jwtService.sign(payload, {
      secret: process.env.JWT_SECRET,
      expiresIn: '8h',
    });

    await this.db
      .update(users)
      .set({
        last_login: new Date()
      })
      .where(eq(users.id, userValidate.id));

    return {
        status: 'success',
        message: 'Login successfully',
        token,
    }
  }

//   async register(email: string, password: string) {
//     return this.userService.create(email, password);
//   }

//   async validateUserById(id: number): Promise<User | null> {
//     return this.userService.findById(id);
//   }
}
