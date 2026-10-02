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

  private async assertAccess(userId: string) {
      const existingUser = await this.db.query.users.findFirst({
          where: eq(users.id, userId)
      });
  
      if (!existingUser || existingUser.is_active === false) {
          throw new BadRequestException('Session user is not allowed to perform this action, might not exists or inactive.');
      }

      return existingUser;
  }

  async findAll(user: RequestUser) {
    await this.assertAccess(user.id);

    const users = await this.db.query.users.findMany({
      columns: {
        id: true,
        email: true,
        name: true,
        username: true,
        is_active: true,
        token_version: true,
        last_login: true,
        createdAt: true,
        updatedAt: true,
      },
      with: {
        tasks: true,
      },
    });

    if (users.length === 0) {
        throw new BadRequestException('No users found.');
    }

    return {
        status: 'success',
        message: 'Here is the list of users',
        users,
    };
  }

  async findById(id: string, user: RequestUser) {
    await this.assertAccess(user.id);
    
    const existingUser = await this.db.query.users.findFirst({
      where: eq(users.id, id),
      columns: {
        id: true,
        email: true,
        name: true,
        username: true,
        is_active: true,
        token_version: true,
        last_login: true,
        createdAt: true,
        updatedAt: true,
      },
      with: {
        tasks: true,
      },
    });

    if (!existingUser) {
        throw new BadRequestException('User does not exists.');
    }

    return {
        status: 'success',
        message: 'Here is the user',
        existingUser,
    };
  }

  async create(dto: CreateUserDto, user: RequestUser) {
    await this.assertAccess(user.id);

    const hashedPassword = await bcrypt.hash(dto.password, 10);

    const [newUser] = await this.db
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
        newUser,
    };
  }
}