import { ApiProperty } from '@nestjs/swagger';

export class CreateChatDto {
  @ApiProperty({ example: 'team-uuid' })
  teamId: string;

  @ApiProperty({ example: 'project-uuid', required: false })
  projectId?: string;
}
