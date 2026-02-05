import { Module } from '@nestjs/common';

import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from 'src/users/entities/user.entity';
import { Credential } from 'src/users/entities/credential.entity';

@Module({
  imports: [TypeOrmModule.forFeature([User, Credential])],
  controllers: [AuthController],
  providers: [
    AuthService,
    // GoogleStrategy,
    // { provide: 'AUTH_SERVICE', useClass: AuthService },
  ],
})
export class AuthModule {}
