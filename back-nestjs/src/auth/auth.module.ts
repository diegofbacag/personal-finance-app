import { Module } from '@nestjs/common';

import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from 'src/users/entities/user.entity';
import { Credential } from 'src/users/entities/credential.entity';
import { JwtModule } from '@nestjs/jwt';

@Module({
  imports: [
    TypeOrmModule.forFeature([User, Credential]),
    JwtModule.register({
      secret: process.env.JWT_SECRET || 'yourSecretKey', // keep this in env
      signOptions: { expiresIn: '1h' },
    }),
  ],
  controllers: [AuthController],
  providers: [
    AuthService,
    // GoogleStrategy,
    // { provide: 'AUTH_SERVICE', useClass: AuthService },
  ],
})
export class AuthModule {}
