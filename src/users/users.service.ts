import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { User, UserDocument } from './schemas/user.schema';

@Injectable()
export class UsersService {
  constructor(
    @InjectModel(User.name) private readonly userModel: Model<UserDocument>,
  ) {}

  getAllUsers() {
    return this.userModel.find({}, { email: 1, _id: 0 });
  }

  async findUserByEmail(email: string) {
    return await this.userModel.findOne({ email });
  }

  createUser(email: string, password: string) {
    return this.userModel.create({ email, password });
  }
}
