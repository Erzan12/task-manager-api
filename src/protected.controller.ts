import { Controller, Get, Request, UseGuards } from '@nestjs/common';
import { JwtAuthGuard } from './auth/guards/jwt-auth.guard';

@Controller()
export class ProtectedController {
  @Get('protected')
  @UseGuards(JwtAuthGuard)
  getProtected(@Request() req) {
    return { message: `Welcome ${req.user.email}` };
  }
}
