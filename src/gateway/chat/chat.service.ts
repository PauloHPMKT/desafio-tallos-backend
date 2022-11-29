import { Injectable } from '@nestjs/common';
import { CreateChatDto } from './dto/create-chat.dto';
import { ChatEntities } from './entities/chat.entity';

@Injectable()
export class ChatService {
  messages: ChatEntities[] = [];
  clientToUser = [];

  //identifing user - join user
  identify(name: string, clientId: string) {
    this.clientToUser[clientId] = name;
    console.log(clientId);
    console.log('um novo usuario entrou na sala', this.clientToUser);
    return Object.values(this.clientToUser);
  }

  leaveRoom(name: string, clientId: string) {
    console.log(name, clientId);
  }

  //creating message
  async create(createChatDto: CreateChatDto, clientId: string) {
    const message = {
      name: this.clientToUser[clientId],
      text: createChatDto.text,
    };
    await this.messages.push(message);

    return message;
  }

  //find all messages
  findAll() {
    console.log(this.messages);
    return this.messages;
  }
}
