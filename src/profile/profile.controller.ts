import { Controller, Get, Patch, Body, Param } from '@nestjs/common';
import { ProfileService } from './profile.service';
import { UpdateProfileDto } from './dto/update-profile.dto';
import { ApiTags, ApiOperation, ApiParam } from '@nestjs/swagger';

@ApiTags('profile')
@Controller('profile')
export class ProfileController {
  constructor(private readonly profileService: ProfileService) {}

  @Get(':userId')
  @ApiOperation({ summary: 'Get user profile' })
  @ApiParam({ name: 'userId', type: 'string' })
  async getProfile(@Param('userId') userId: string) {
    return this.profileService.getProfile(userId);
  }

  @Patch(':userId')
  @ApiOperation({ summary: 'Update user profile' })
  @ApiParam({ name: 'userId', type: 'string' })
  async updateProfile(
    @Param('userId') userId: string,
    @Body() dto: UpdateProfileDto,
  ) {
    return this.profileService.updateProfile(userId, dto);
  }
}
