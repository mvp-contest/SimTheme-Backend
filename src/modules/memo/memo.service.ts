import { Injectable } from '@nestjs/common';
import { PrismaService } from '../../prisma/prisma.service';
import { CreateMemoDto } from './dto/create-memo.dto';
import { UpdateMemoDto } from './dto/update-memo.dto';

@Injectable()
export class MemoService {
  constructor(private readonly prisma: PrismaService) {}

  async create(createMemoDto: CreateMemoDto) {
    return this.prisma.memo.create({
      data: {
        projectId: createMemoDto.projectId,
        content: createMemoDto.content,
        author: createMemoDto.author,
      },
      include: {
        project: true,
      },
    });
  }

  async findByProject(projectId: string) {
    return this.prisma.memo.findMany({
      where: { projectId },
      orderBy: {
        createdAt: 'desc',
      },
    });
  }

  async findOne(id: string) {
    return this.prisma.memo.findUnique({
      where: { id },
      include: {
        project: true,
      },
    });
  }

  async update(id: string, updateMemoDto: UpdateMemoDto) {
    return this.prisma.memo.update({
      where: { id },
      data: {
        content: updateMemoDto.content,
      },
    });
  }

  async remove(id: string) {
    return this.prisma.memo.delete({
      where: { id },
    });
  }
}
