import { Body, Controller, Get, Post, UseGuards } from '@nestjs/common';
import { AuthService } from './auth.service';
import { GoogleAuthGuard } from 'src/auth/utils/GoogleAuthGuard';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}
  @Get('google')
  @UseGuards(GoogleAuthGuard)
  googleLogin(): void {
    // Empty on purpose – just triggers the guard
  }

  @Post('signup')
  create() {
    this.authService.emailSignUp();
  }
}
