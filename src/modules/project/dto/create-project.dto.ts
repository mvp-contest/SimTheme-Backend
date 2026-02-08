import { ApiProperty } from '@nestjs/swagger';

export class CreateProjectDto {
  @ApiProperty({ example: 'team-uuid' })
  teamId: string;

  @ApiProperty({ example: 'My Project' })
  name: string;
}
