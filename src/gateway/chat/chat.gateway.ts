import { WebSocketGateway, SubscribeMessage, MessageBody, WebSocketServer, ConnectedSocket } from '@nestjs/websockets';
import { Server, Socket } from 'socket.io';
import { ChatService } from './chat.service';
import { CreateChatDto } from './dto/create-chat.dto';

@WebSocketGateway(3002, {
  cors: {
    origin: '*'
  }
})
export class ChatGateway {
  @WebSocketServer()
  server: Server;

  constructor(private readonly chatService: ChatService) {}

  //create messages
  @SubscribeMessage('createChat')
  async create(@MessageBody() createChatDto: CreateChatDto, @ConnectedSocket() client: Socket) {
    const message = await this.chatService.create(createChatDto, client.id)

    this.server.emit('message', message)

    return message
  }

  //find all messages
  @SubscribeMessage('findAllChat')
  findAll() {
    return this.chatService.findAll();
  }

  //join user room
  @SubscribeMessage('join')
  joinRoom(@MessageBody('name') name: string, @ConnectedSocket() client: Socket ) {
    return this.chatService.identify(name, client.id)
  }

  //identifing typing user
  @SubscribeMessage('typing')
  async typing(@MessageBody('isTyping') isTyping: string, @ConnectedSocket() client: Socket) {
    const name = await this.chatService.getClientName(client.id)

    client.broadcast.emit('typing', { name, isTyping })
  }


  /*emitUserLogged() {
    this.server.emit('is-logged')
    console.log('usuario logado')
  }*/
}


