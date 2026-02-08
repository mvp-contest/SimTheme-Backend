import { ApiProperty } from '@nestjs/swagger';

export class CreateMemoDto {
  @ApiProperty({ example: 'project-uuid' })
  projectId: string;

  @ApiProperty({ example: 'This is a memo' })
  content: string;

  @ApiProperty({ example: 'John Doe' })
  author: string;
}
