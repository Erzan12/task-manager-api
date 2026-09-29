// import { Injectable } from '@nestjs/common';
// import { InjectRepository } from '@nestjs/typeorm';
// import { Repository } from 'typeorm';
// import * as bcrypt from 'bcrypt';
// import { User } from 'src/middleware/jwt/user.entity';

// @Injectable()
// export class UserService {
//   constructor(
//     @InjectRepository(User)
//     private readonly userRepo: Repository<User>,
//   ) {}

//   async create(email: string, password: string): Promise<User> {
//     const hashed = await bcrypt.hash(password, 10);
//     const user = this.userRepo.create({ email, password: hashed });
//     return this.userRepo.save(user);
//   }

//   async findByEmail(email: string): Promise<User | null> {
//     return this.userRepo.findOne({ where: { email } });
//   }

//   async findById(id: number): Promise<User | null> {
//     return this.userRepo.findOne({ where: { id } });
//   }

//   async validateUser(email: string, password: string): Promise<User | null> {
//     const user = await this.findByEmail(email);
//     if (user && (await bcrypt.compare(password, user.password))) {
//       return user;
//     }
//     return null;
//   }
// }
