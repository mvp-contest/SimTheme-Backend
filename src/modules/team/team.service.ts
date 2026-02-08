import { Injectable } from '@nestjs/common';
import { PrismaService } from '../../prisma/prisma.service';
import { CreateTeamDto } from './dto/create-team.dto';
import { UpdateTeamDto } from './dto/update-team.dto';
import { AddMemberDto } from './dto/add-member.dto';
import { UpdateMemberRoleDto } from './dto/update-member-role.dto';

@Injectable()
export class TeamService {
  constructor(private readonly prisma: PrismaService) {}

  async create(createTeamDto: CreateTeamDto, creatorId: string) {
    return this.prisma.team.create({
      data: {
        name: createTeamDto.name,
        members: {
          create: {
            userId: creatorId,
            role: 1, // Creator is admin
          },
        },
      },
      include: {
        members: {
          include: {
            user: {
              select: {
                id: true,
                personalId: true,
                email: true,
                profile: true,
              },
            },
          },
        },
      },
    });
  }

  async findAll(userId: string) {
    return this.prisma.team.findMany({
      where: {
        members: {
          some: {
            userId,
          },
        },
      },
      include: {
        members: {
          include: {
            user: {
              select: {
                id: true,
                personalId: true,
                email: true,
                profile: true,
              },
            },
          },
        },
        _count: {
          select: {
            projects: true,
          },
        },
      },
    });
  }

  async findOne(id: string) {
    return this.prisma.team.findUnique({
      where: { id },
      include: {
        members: {
          include: {
            user: {
              select: {
                id: true,
                personalId: true,
                email: true,
                profile: true,
              },
            },
          },
        },
        projects: true,
      },
    });
  }

  async update(id: string, updateTeamDto: UpdateTeamDto) {
    return this.prisma.team.update({
      where: { id },
      data: { name: updateTeamDto.name },
    });
  }

  async remove(id: string) {
    return this.prisma.team.delete({
      where: { id },
    });
  }

  async addMember(teamId: string, addMemberDto: AddMemberDto) {
    return this.prisma.teamMember.create({
      data: {
        teamId,
        userId: addMemberDto.userId,
        role: addMemberDto.role,
      },
      include: {
        user: {
          select: {
            id: true,
            personalId: true,
            email: true,
            profile: true,
          },
        },
      },
    });
  }

  async updateMemberRole(
    teamId: string,
    userId: string,
    updateMemberRoleDto: UpdateMemberRoleDto,
  ) {
    return this.prisma.teamMember.update({
      where: {
        teamId_userId: {
          teamId,
          userId,
        },
      },
      data: { role: updateMemberRoleDto.role },
    });
  }

  async removeMember(teamId: string, userId: string) {
    return this.prisma.teamMember.delete({
      where: {
        teamId_userId: {
          teamId,
          userId,
        },
      },
    });
  }
}
