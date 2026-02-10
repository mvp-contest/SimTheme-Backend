import {
  WebSocketGateway,
  SubscribeMessage,
  MessageBody,
  WebSocketServer,
  ConnectedSocket,
  OnGatewayConnection,
  OnGatewayDisconnect,
} from '@nestjs/websockets';
import { Server, Socket } from 'socket.io';
import { ChatService } from './chat.service';
import { CreateMessageDto } from './dto/create-message.dto';
import { UpdateMessageDto } from './dto/update-message.dto';

@WebSocketGateway({
  cors: {
    origin: '*',
  },
})
export class ChatGateway implements OnGatewayConnection, OnGatewayDisconnect {
  @WebSocketServer()
  server: Server;

  constructor(private readonly chatService: ChatService) {}

  handleConnection(client: Socket) {
    console.log(`Client connected: ${client.id}`);
  }

  handleDisconnect(client: Socket) {
    console.log(`Client disconnected: ${client.id}`);
  }

  @SubscribeMessage('join-chat')
  async handleJoinChat(
    @MessageBody() data: { chatId: string },
    @ConnectedSocket() client: Socket,
  ) {
    client.join(data.chatId);
    return { event: 'joined-chat', chatId: data.chatId };
  }

  @SubscribeMessage('leave-chat')
  async handleLeaveChat(
    @MessageBody() data: { chatId: string },
    @ConnectedSocket() client: Socket,
  ) {
    client.leave(data.chatId);
    return { event: 'left-chat', chatId: data.chatId };
  }

  @SubscribeMessage('send-message')
  async handleSendMessage(
    @MessageBody() data: { chatId: string; message: CreateMessageDto },
  ) {
    const message = await this.chatService.createMessage(
      data.chatId,
      data.message,
    );

    this.server.to(data.chatId).emit('new-message', message);

    return { event: 'message-sent', message };
  }

  @SubscribeMessage('edit-message')
  async handleEditMessage(
    @MessageBody() data: { messageId: string; update: UpdateMessageDto },
  ) {
    const message = await this.chatService.updateMessage(
      data.messageId,
      data.update,
    );

    const chat = await this.chatService.findOne(message.chatId);
    this.server.to(message.chatId).emit('message-edited', message);

    return { event: 'message-edited', message };
  }

  @SubscribeMessage('delete-message')
  async handleDeleteMessage(@MessageBody() data: { messageId: string }) {
    const message = await this.chatService.deleteMessage(data.messageId);

    this.server.to(message.chatId).emit('message-deleted', { id: data.messageId });

    return { event: 'message-deleted', messageId: data.messageId };
  }

  @SubscribeMessage('typing')
  async handleTyping(
    @MessageBody() data: { chatId: string; userId: string; isTyping: boolean },
  ) {
    this.server.to(data.chatId).emit('user-typing', {
      userId: data.userId,
      isTyping: data.isTyping,
    });
  }
}
