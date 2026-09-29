// import { Injectable } from '@nestjs/common';
// import { JwtService } from '@nestjs/jwt';
// import { UserService } from '../user/user.service';
// import { User } from 'src/middleware/jwt/user.entity';

// @Injectable()
// export class AuthService {
//   constructor(
//     private userService: UserService,
//     private jwtService: JwtService,
//   ) {}

//   async validateUser(email: string, password: string): Promise<User | null> {
//     return this.userService.validateUser(email, password);
//   }

//   async login(user: User) {
//     const payload = { sub: user.id, email: user.email };
//     return {
//       access_token: this.jwtService.sign(payload),
//     };
//   }

//   async register(email: string, password: string) {
//     return this.userService.create(email, password);
//   }

//   async validateUserById(id: number): Promise<User | null> {
//     return this.userService.findById(id);
//   }
// }
