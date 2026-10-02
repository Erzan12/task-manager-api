import { BadRequestException, ConflictException, Inject, Injectable } from '@nestjs/common';
import { Database, DATABASE } from 'src/database/database.provider';
import { users } from 'src/database/schema';
import { CreateUserDto } from './dto/user.dto';
import * as bcrypt from 'bcrypt';
import { RequestUser } from 'src/utils/types/request-user.interface';
import { eq } from 'drizzle-orm';

@Injectable()
export class UsersService {
  constructor(
    @Inject(DATABASE)
    private readonly db: Database,
  ) {}

  async findAll(user: RequestUser) {
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
        where: eq(users.email, email),
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
    const hashedPassword = await bcrypt.hash(dto.password, 10);

    const [user] = await this.db
      .insert(users)
      .values({
        email: dto.email,
        name: dto.name,
        username: dto.username,
        password: hashedPassword,
      })
      .returning();

    return {
        status: 'success',
        message: 'User created successfully',
        user,
    };
  }
}