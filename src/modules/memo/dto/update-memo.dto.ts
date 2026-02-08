import { ApiProperty } from '@nestjs/swagger';

export class UpdateMemoDto {
  @ApiProperty({ example: 'Updated memo content' })
  content: string;
}
