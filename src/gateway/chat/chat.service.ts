import { Injectable } from '@nestjs/common';
import { CreateChatDto } from './dto/create-chat.dto';
import { ChatEntities } from './entities/chat.entity';

@Injectable()
export class ChatService {
  messages: ChatEntities[] = [{ name: 'Paulo', text: 'Teste' }]
  clientToUser = {}

  //identifing user
  identify(name: string, clientId: string) {
    this.clientToUser[clientId] = name

    return Object.values(this.clientToUser)
  }

  //creating message
  async create(createChatDto: CreateChatDto, clientId: string) {
    const message = {
      name: this.clientToUser[clientId],
      text: createChatDto.text
    }
    await this.messages.push(message)

    return message
  }

  //find all messages
  findAll() {
    return this.messages
  }

  //getting client by name
  getClientName(clientId: string) {
    return this.clientToUser[clientId]
  }
}
