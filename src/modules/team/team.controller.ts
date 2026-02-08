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
import { TeamService } from './team.service';
import { CreateTeamDto } from './dto/create-team.dto';
import { UpdateTeamDto } from './dto/update-team.dto';
import { AddMemberDto } from './dto/add-member.dto';
import { UpdateMemberRoleDto } from './dto/update-member-role.dto';

@ApiTags('teams')
@Controller('teams')
export class TeamController {
  constructor(private readonly teamService: TeamService) {}

  @Post()
  @ApiOperation({ summary: 'Create team' })
  create(@Body() createTeamDto: CreateTeamDto, @Body('creatorId') creatorId: string) {
    return this.teamService.create(createTeamDto, creatorId);
  }

  @Get('user/:userId')
  @ApiOperation({ summary: 'Get all teams for user' })
  findAll(@Param('userId') userId: string) {
    return this.teamService.findAll(userId);
  }

  @Get(':id')
  @ApiOperation({ summary: 'Get team by id' })
  findOne(@Param('id') id: string) {
    return this.teamService.findOne(id);
  }

  @Patch(':id')
  @ApiOperation({ summary: 'Update team' })
  update(@Param('id') id: string, @Body() updateTeamDto: UpdateTeamDto) {
    return this.teamService.update(id, updateTeamDto);
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Delete team' })
  remove(@Param('id') id: string) {
    return this.teamService.remove(id);
  }

  @Post(':teamId/members')
  @ApiOperation({ summary: 'Add member to team' })
  addMember(@Param('teamId') teamId: string, @Body() addMemberDto: AddMemberDto) {
    return this.teamService.addMember(teamId, addMemberDto);
  }

  @Patch(':teamId/members/:userId')
  @ApiOperation({ summary: 'Update member role' })
  updateMemberRole(
    @Param('teamId') teamId: string,
    @Param('userId') userId: string,
    @Body() updateMemberRoleDto: UpdateMemberRoleDto,
  ) {
    return this.teamService.updateMemberRole(teamId, userId, updateMemberRoleDto);
  }

  @Delete(':teamId/members/:userId')
  @ApiOperation({ summary: 'Remove member from team' })
  removeMember(@Param('teamId') teamId: string, @Param('userId') userId: string) {
    return this.teamService.removeMember(teamId, userId);
  }
}
