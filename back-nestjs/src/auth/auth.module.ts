import { Module } from '@nestjs/common';

import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';

@Module({
  imports: [],
  controllers: [AuthController],
  providers: [
    AuthService,
    // GoogleStrategy,
    // { provide: 'AUTH_SERVICE', useClass: AuthService },
  ],
})
export class AuthModule {}
