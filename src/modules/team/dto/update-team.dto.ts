import { ApiProperty } from '@nestjs/swagger';

export class UpdateTeamDto {
  @ApiProperty({ example: 'Updated Team Name' })
  name: string;
}
