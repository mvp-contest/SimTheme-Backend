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
import { ChatService } from './chat.service';
import { CreateChatDto } from './dto/create-chat.dto';
import { CreateMessageDto } from './dto/create-message.dto';
import { UpdateMessageDto } from './dto/update-message.dto';

@ApiTags('chats')
@Controller('chats')
export class ChatController {
  constructor(private readonly chatService: ChatService) {}

  @Post()
  @ApiOperation({ summary: 'Create chat' })
  createChat(@Body() createChatDto: CreateChatDto) {
    return this.chatService.createChat(createChatDto);
  }

  @Get('team/:teamId')
  @ApiOperation({ summary: 'Get all chats for team' })
  findChatsByTeam(@Param('teamId') teamId: string) {
    return this.chatService.findChatsByTeam(teamId);
  }

  @Get('project/:projectId')
  @ApiOperation({ summary: 'Get all chats for project' })
  findChatsByProject(@Param('projectId') projectId: string) {
    return this.chatService.findChatsByProject(projectId);
  }

  @Get(':id')
  @ApiOperation({ summary: 'Get chat by id with messages' })
  findOne(@Param('id') id: string) {
    return this.chatService.findOne(id);
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Delete chat' })
  deleteChat(@Param('id') id: string) {
    return this.chatService.deleteChat(id);
  }

  @Post(':chatId/messages')
  @ApiOperation({ summary: 'Send message to chat' })
  createMessage(
    @Param('chatId') chatId: string,
    @Body() createMessageDto: CreateMessageDto,
  ) {
    return this.chatService.createMessage(chatId, createMessageDto);
  }

  @Get(':chatId/messages')
  @ApiOperation({ summary: 'Get all messages in chat' })
  getMessages(@Param('chatId') chatId: string) {
    return this.chatService.getMessages(chatId);
  }

  @Patch('messages/:id')
  @ApiOperation({ summary: 'Edit message' })
  updateMessage(@Param('id') id: string, @Body() updateMessageDto: UpdateMessageDto) {
    return this.chatService.updateMessage(id, updateMessageDto);
  }

  @Delete('messages/:id')
  @ApiOperation({ summary: 'Delete message (soft delete)' })
  deleteMessage(@Param('id') id: string) {
    return this.chatService.deleteMessage(id);
  }
}
