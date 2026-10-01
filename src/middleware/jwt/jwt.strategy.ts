import { Inject, Injectable, UnauthorizedException } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { Request } from 'express';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { Database, DATABASE } from 'src/database/database.provider';
import { JwtPayload } from 'src/utils/types/authentication.interface';
import { RequestUser } from 'src/utils/types/request-user.interface';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor(@Inject(DATABASE) private readonly db: Database) {
    const secret = process.env.JWT_SECRET;
    if (!secret) {
        throw new Error('JWT_SECRET environment variable is not defined');
    }
    super({
      jwtFromRequest: ExtractJwt.fromExtractors([
        (request: Request): string | null => {
          return typeof request.cookies?.['accessToken'] === 'string'
            ? request.cookies['accessToken']
            : null;
        },
      ]),
      ignoreExpiration: false,
      secretOrKey: secret
    });
  }

  async validate(payload: JwtPayload): Promise<RequestUser> {
    const user = await this.db.query.users.findFirst({
      where: { id: payload.userUUID },
    })

    if (!user || user.is_active !== true) {
      throw new UnauthorizedException('User not found or does not exists.');
    }

    if (payload.tokenVersion !== user.token_version) {
      throw new UnauthorizedException('Token has been invalidated');
    }

    return {
      id: user.id,
      email: user.email,
      username: user.username,    
    };
  }
}
