import { Injectable } from '@nestjs/common';
import { CreateChatDto } from './dto/create-chat.dto';
import { ChatEntities } from './entities/chat.entity';

@Injectable()
export class ChatService {
  messages: ChatEntities[] = []
  clientToUser = {}

  //identifing user - join user
  identify(name: string, clientId: string) {
    this.clientToUser[clientId] = name
    console.log('um novo usuario entrou na sala')
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
    console.log(this.messages)
    return this.messages
  } 
}
