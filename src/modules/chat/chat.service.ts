import { Injectable } from '@nestjs/common';
import { PrismaService } from '../../prisma/prisma.service';
import { CreateChatDto } from './dto/create-chat.dto';
import { CreateMessageDto } from './dto/create-message.dto';
import { UpdateMessageDto } from './dto/update-message.dto';

@Injectable()
export class ChatService {
  constructor(private readonly prisma: PrismaService) {}

  async createChat(createChatDto: CreateChatDto) {
    return this.prisma.chat.create({
      data: {
        teamId: createChatDto.teamId,
        projectId: createChatDto.projectId,
      },
      include: {
        team: true,
        project: true,
      },
    });
  }

  async findChatsByTeam(teamId: string) {
    return this.prisma.chat.findMany({
      where: { teamId },
      include: {
        project: true,
        _count: {
          select: {
            messages: true,
          },
        },
      },
    });
  }

  async findChatsByProject(projectId: string) {
    return this.prisma.chat.findMany({
      where: { projectId },
      include: {
        team: true,
        _count: {
          select: {
            messages: true,
          },
        },
      },
    });
  }

  async findOne(id: string) {
    return this.prisma.chat.findUnique({
      where: { id },
      include: {
        team: true,
        project: true,
        messages: {
          include: {
            user: {
              select: {
                id: true,
                personalId: true,
                profile: true,
              },
            },
            targetMessage: true,
          },
          orderBy: {
            createdAt: 'asc',
          },
        },
      },
    });
  }

  async deleteChat(id: string) {
    return this.prisma.chat.delete({
      where: { id },
    });
  }

  async createMessage(chatId: string, createMessageDto: CreateMessageDto) {
    return this.prisma.message.create({
      data: {
        chatId,
        userId: createMessageDto.userId,
        content: createMessageDto.content,
        targetId: createMessageDto.targetId,
      },
      include: {
        user: {
          select: {
            id: true,
            personalId: true,
            profile: true,
          },
        },
        targetMessage: true,
      },
    });
  }

  async updateMessage(id: string, updateMessageDto: UpdateMessageDto) {
    return this.prisma.message.update({
      where: { id },
      data: {
        content: updateMessageDto.content,
        editedAt: new Date(),
      },
      include: {
        user: {
          select: {
            id: true,
            personalId: true,
            profile: true,
          },
        },
      },
    });
  }

  async deleteMessage(id: string) {
    return this.prisma.message.update({
      where: { id },
      data: {
        deletedAt: new Date(),
      },
    });
  }

  async getMessages(chatId: string) {
    return this.prisma.message.findMany({
      where: {
        chatId,
        deletedAt: null,
      },
      include: {
        user: {
          select: {
            id: true,
            personalId: true,
            profile: true,
          },
        },
        targetMessage: true,
      },
      orderBy: {
        createdAt: 'asc',
      },
    });
  }
}
