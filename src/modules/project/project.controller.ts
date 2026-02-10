import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UseInterceptors,
  UploadedFiles,
} from '@nestjs/common';
import { FileFieldsInterceptor } from '@nestjs/platform-express';
import { ApiTags, ApiOperation, ApiConsumes } from '@nestjs/swagger';
import { ProjectService } from './project.service';
import { CreateProjectDto } from './dto/create-project.dto';
import { UpdateProjectDto } from './dto/update-project.dto';
import { AddProjectMemberDto } from './dto/add-member.dto';
import { UpdateProjectMemberRoleDto } from './dto/update-member-role.dto';

@ApiTags('projects')
@Controller('projects')
export class ProjectController {
  constructor(private readonly projectService: ProjectService) {}

  @Post()
  @ApiOperation({
    summary: 'Create project with multiple 3D model files and JSON file',
  })
  @ApiConsumes('multipart/form-data')
  @UseInterceptors(
    FileFieldsInterceptor([
      { name: 'modelFiles', maxCount: 50 },
      { name: 'jsonFile', maxCount: 1 },
    ]),
  )
  create(
    @Body() createProjectDto: CreateProjectDto,
    @Body('creatorId') creatorId: string,
    @UploadedFiles()
    files: {
      modelFiles?: Express.Multer.File[];
      jsonFile?: Express.Multer.File[];
    },
  ) {
    return this.projectService.create(
      createProjectDto,
      creatorId,
      files?.modelFiles,
      files?.jsonFile?.[0],
    );
  }

  @Get('user/:userId')
  @ApiOperation({ summary: 'Get all projects for user' })
  findAll(@Param('userId') userId: string) {
    return this.projectService.findAll(userId);
  }

  @Get('team/:teamId')
  @ApiOperation({ summary: 'Get all projects for team' })
  findByTeam(@Param('teamId') teamId: string) {
    return this.projectService.findByTeam(teamId);
  }

  @Get(':id')
  @ApiOperation({ summary: 'Get project by id' })
  findOne(@Param('id') id: string) {
    return this.projectService.findOne(id);
  }

  @Patch(':id')
  @ApiOperation({ summary: 'Update project' })
  update(@Param('id') id: string, @Body() updateProjectDto: UpdateProjectDto) {
    return this.projectService.update(id, updateProjectDto);
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Delete project' })
  remove(@Param('id') id: string) {
    return this.projectService.remove(id);
  }

  @Post(':projectId/members')
  @ApiOperation({ summary: 'Add member to project' })
  addMember(
    @Param('projectId') projectId: string,
    @Body() addMemberDto: AddProjectMemberDto,
  ) {
    return this.projectService.addMember(projectId, addMemberDto);
  }

  @Patch(':projectId/members/:userId')
  @ApiOperation({ summary: 'Update project member role' })
  updateMemberRole(
    @Param('projectId') projectId: string,
    @Param('userId') userId: string,
    @Body() updateMemberRoleDto: UpdateProjectMemberRoleDto,
  ) {
    return this.projectService.updateMemberRole(
      projectId,
      userId,
      updateMemberRoleDto,
    );
  }

  @Delete(':projectId/members/:userId')
  @ApiOperation({ summary: 'Remove member from project' })
  removeMember(
    @Param('projectId') projectId: string,
    @Param('userId') userId: string,
  ) {
    return this.projectService.removeMember(projectId, userId);
  }

  @Patch(':id/access')
  @ApiOperation({ summary: 'Update last accessed time' })
  updateLastAccessed(@Param('id') id: string) {
    return this.projectService.updateLastAccessed(id);
  }
}
