import { Controller, Post, Body, UnauthorizedException } from '@nestjs/common';
import { AuthService } from './auth.service';
import { LoginDto } from './dto/login.dto';

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

//   @Post('register')
//   async register(@Body() body: { email: string; password: string }) {
//     const user = await this.authService.register(body.email, body.password);
//     return { message: 'User registered', user };
//   }

  @Post('login')
  async login(
    // @Body() body: { email: string; password: string }) 
    @Body() dto: LoginDto
)
    {
    return this.authService.login(dto);
  }
}
