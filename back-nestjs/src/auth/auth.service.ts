import {
  ConflictException,
  Injectable,
  NotFoundException,
  UnauthorizedException,
} from '@nestjs/common';
import { CreateUserDto } from 'src/users/dto/create-user.dto';
import * as bcrypt from 'bcrypt';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Credential } from 'src/users/entities/credential.entity';
import { User } from 'src/users/entities/user.entity';
import { JwtService } from '@nestjs/jwt';
import { error } from 'console';

@Injectable()
export class AuthService {
  constructor(
    @InjectRepository(Credential)
    private readonly credentialRepository: Repository<Credential>,
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
    private jwtService: JwtService,
  ) {}

  async create(createUserDto: CreateUserDto) {
    const emailExists: Credential | null =
      await this.credentialRepository.findOneBy({ email: createUserDto.email });

    if (emailExists) {
      throw new ConflictException('Email already exists');
    }

    const hashedPassword = await bcrypt.hash(createUserDto.password, 10);

    const user = this.userRepository.create({
      credentials: {
        email: createUserDto.email,
        password: hashedPassword,
      },
    });

    await this.userRepository.save(user);

    const payload = { sub: user.id };

    return { access_token: await this.jwtService.signAsync(payload) };
  }

  async emailSignIn(signInDto) {
    const credentials = await this.credentialRepository.findOne({
      where: { email: signInDto.email },
      relations: ['user'],
    });

    if (!credentials) {
      throw new UnauthorizedException('Invalid email or password');
    }

    const isMatch: boolean = await bcrypt.compare(
      signInDto.password,
      credentials.password,
    );

    if (!isMatch) {
      throw new UnauthorizedException('Invalid email or password');
    }
    console.log('todo bien hasta aqui', credentials);

    const payload = { sub: credentials.user.id };

    return { access_token: await this.jwtService.signAsync(payload) };
  }
}
