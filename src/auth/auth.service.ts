import { Injectable } from '@nestjs/common';
import { UsersService } from 'src/users/users.service';
import * as bcrypt from 'bcrypt';
import { SignupDto } from './dtos/signup.dto';
import { UserProfilesService } from 'src/user-profiles/user-profiles.service';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthService {
  constructor(
    private readonly usersService: UsersService,
    private readonly userProfileService: UserProfilesService,
    private readonly jwtService: JwtService,
  ) {}
  async validateUser(email: string, password: string) {
    const user = await this.usersService.findUserByEmail(email);
    if (user && (await bcrypt.compare(password, user.password))) {
      return user;
    }

    return null;
  }

  async login(user: any) {
    const payload = { email: user.email, sub: user.id };
    return {
      accessToken: this.jwtService.sign(payload),
    };
  }

  async signup({ email, firstName, lastName, password, phone }: SignupDto) {
    const hashedPassword = await this.hashData(password);
    const user = await this.usersService.createUser(email, hashedPassword);
    await this.userProfileService.createProfile(
      user.id,
      firstName,
      lastName,
      phone,
    );
    return { msg: 'user created successfully' };
  }

  async hashData(data: any) {
    return await bcrypt.hash(data, 12);
  }
}
