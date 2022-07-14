import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { UserProfile, UserProfileSchema } from './schemas/user-profile.schema';
import { UserProfilesService } from './user-profiles.service';
import { UserProfilesController } from './user-profiles.controller';

@Module({
  imports: [
    MongooseModule.forFeature([
      {
        name: UserProfile.name,
        schema: UserProfileSchema,
        collection: 'user_profiles',
      },
    ]),
  ],
  providers: [UserProfilesService],
  exports: [UserProfilesService],
  controllers: [UserProfilesController],
})
export class UserProfilesModule {}
