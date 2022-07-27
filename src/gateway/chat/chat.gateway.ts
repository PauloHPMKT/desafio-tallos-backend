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
    const enterUser = this.chatService.identify(name, client.id)
    
    client.broadcast.emit('join-room', enterUser)
    //this.server.emit('join-room', enterUser)
    console.log(enterUser)

    return enterUser
  }
}


