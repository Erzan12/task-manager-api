import { Module } from '@nestjs/common';
import { AuthModule } from './modules/auth/auth.module';
import { DatabaseModule } from './database/database.module';
import { ConfigModule } from '@nestjs/config';
import { UserModule } from './modules/user/user.module';
import { APP_GUARD } from '@nestjs/core';
import { CustomJwtAuthGuard } from './middleware/jwt/jwt.auth.guard';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    AuthModule,
    DatabaseModule,
    UserModule,
  ],
  providers: [
    {
      provide: APP_GUARD,
      useClass: CustomJwtAuthGuard,
    }
  ],
  controllers: [],
})
export class AppModule {}
