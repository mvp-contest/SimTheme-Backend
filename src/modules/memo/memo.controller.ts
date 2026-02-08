import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { ApiTags, ApiOperation } from '@nestjs/swagger';
import { MemoService } from './memo.service';
import { CreateMemoDto } from './dto/create-memo.dto';
import { UpdateMemoDto } from './dto/update-memo.dto';

@ApiTags('memos')
@Controller('memos')
export class MemoController {
  constructor(private readonly memoService: MemoService) {}

  @Post()
  @ApiOperation({ summary: 'Create memo' })
  create(@Body() createMemoDto: CreateMemoDto) {
    return this.memoService.create(createMemoDto);
  }

  @Get('project/:projectId')
  @ApiOperation({ summary: 'Get all memos for project' })
  findByProject(@Param('projectId') projectId: string) {
    return this.memoService.findByProject(projectId);
  }

  @Get(':id')
  @ApiOperation({ summary: 'Get memo by id' })
  findOne(@Param('id') id: string) {
    return this.memoService.findOne(id);
  }

  @Patch(':id')
  @ApiOperation({ summary: 'Update memo' })
  update(@Param('id') id: string, @Body() updateMemoDto: UpdateMemoDto) {
    return this.memoService.update(id, updateMemoDto);
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Delete memo' })
  remove(@Param('id') id: string) {
    return this.memoService.remove(id);
  }
}
