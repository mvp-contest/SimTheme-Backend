import { ApiProperty } from '@nestjs/swagger';

export class UpdateMemberRoleDto {
  @ApiProperty({ example: 1, description: '1: admin, 2: member' })
  role: number;
}
