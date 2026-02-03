import { Module } from '@nestjs/common';
import { UsersService } from './users.service';
import { UsersController } from './users.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Expense } from 'src/expenses/expense.entity';
import { User } from './entities/user.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Expense, User])],
  controllers: [UsersController],
  providers: [UsersService],
})
export class UsersModule {}
