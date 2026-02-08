import { ApiProperty } from '@nestjs/swagger';

export class CreateMessageDto {
  @ApiProperty({ example: 'user-uuid' })
  userId: string;

  @ApiProperty({ example: 'Hello, world!' })
  content: string;

  @ApiProperty({ example: 'message-uuid', required: false })
  targetId?: string;
}
