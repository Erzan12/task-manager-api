import { BadRequestException, ConflictException, Inject, Injectable } from '@nestjs/common';
import { Database, DATABASE } from 'src/database/database.provider';
import { users } from 'src/database/schema';
import { CreateUserDto } from './dto/user.dto';

@Injectable()
export class UsersService {
  constructor(
    @Inject(DATABASE)
    private readonly db: Database,
  ) {}

  async findAll() {
    const users = await this.db.query.users.findMany();

    if (users.length === 0) {
        throw new BadRequestException('No users found.');
    }

    return {
        status: 'success',
        message: 'Here is the list of users',
        users,
    };
  }

  async findByEmail(email: string) {
    const user = await this.db.query.users.findFirst({
        where: { email },
    });

    if (!user) {
        throw new BadRequestException('User does not exists.');
    }

    return {
        status: 'success',
        message: 'Here is the user',
        user,
    };
  }

  async create(dto: CreateUserDto) {
    const [user] = await this.db
      .insert(users)
      .values({
        email: dto.email,
        name: dto.name,
      })
      .returning();

    return {
        status: 'success',
        message: 'User created successfully',
        user,
    };
  }
}