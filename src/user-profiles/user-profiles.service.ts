import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { UpdateProfileDto } from './dtos/update-user-profile.dto';
import {
  UserProfile,
  UserProfileDocument,
} from './schemas/user-profile.schema';

@Injectable()
export class UserProfilesService {
  constructor(
    @InjectModel(UserProfile.name)
    private readonly userProfileModel: Model<UserProfileDocument>,
  ) {}

  createProfile(
    userId: string,
    firstName: string,
    lastName: string,
    phone: string,
  ) {
    return this.userProfileModel.create({ userId, firstName, lastName, phone });
  }

  async getProfileByUserId(userId: string) {
    const profile = await this.userProfileModel.findOne(
      { userId },
      { _id: 0, __v: 0, userId: 0 },
    );

    if (!profile) {
      throw new NotFoundException('profile not found');
    }

    return profile;
  }

  async updateProfile(userId: string, updateProfileDto: UpdateProfileDto) {
    const result = await this.userProfileModel.updateOne(
      { userId },
      updateProfileDto,
    );
    if (result.acknowledged) {
      return { msg: 'Profile updated' };
    } else {
      return { msg: 'Error occured while updating profile' };
    }
  }
}
