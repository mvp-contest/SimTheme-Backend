import { ApiPropertyOptional } from '@nestjs/swagger';

export class UpdateProfileDto {
  @ApiPropertyOptional({ example: 'NewNickname' })
  nickname?: string;

  @ApiPropertyOptional({ example: 'About me description' })
  aboutUs?: string;

  @ApiPropertyOptional({ example: 'https://example.com/avatar.jpg' })
  avatar?: string;
}
