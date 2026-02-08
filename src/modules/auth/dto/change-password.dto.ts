import { ApiProperty } from '@nestjs/swagger';

export class ChangePasswordDto {
  @ApiProperty({ example: 'currentPassword123' })
  currentPassword: string;

  @ApiProperty({ example: 'newPassword123' })
  newPassword: string;
}
