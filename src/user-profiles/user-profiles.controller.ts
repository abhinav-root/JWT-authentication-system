import { Body, Controller, Get, Patch, Req, UseGuards } from '@nestjs/common';
import { JwtAuthGuard } from 'src/auth/guards/jwt-auth.guard';
import { UpdateProfileDto } from './dtos/update-user-profile.dto';
import { UserProfilesService } from './user-profiles.service';

@Controller('user-profiles')
export class UserProfilesController {
  constructor(private readonly userProfilesService: UserProfilesService) {}

  @Get()
  @UseGuards(JwtAuthGuard)
  getProfile(@Req() req) {
    return this.userProfilesService.getProfileByUserId(req.user.userId);
  }

  @Patch()
  @UseGuards(JwtAuthGuard)
  updateProfile(@Body() updateProfileDto: UpdateProfileDto, @Req() req) {
    const userId = req.user.userId;
    return this.userProfilesService.updateProfile(userId, updateProfileDto);
  }
}
