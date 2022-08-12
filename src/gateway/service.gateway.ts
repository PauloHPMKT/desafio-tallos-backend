import { WebSocketGateway, WebSocketServer } from '@nestjs/websockets';
import { Server, Socket } from 'socket.io';
import { User } from 'src/user/entities/user.entity';

@WebSocketGateway(3002, {
  cors: {
    origin: '*',
  },
})
export class ServiceGateway {
  @WebSocketServer()
  server: Server;

  //registring new user
  emitingCreateUserEvent(): void {
    this.server.emit('user-created');
    console.log('usuario criado');
  }
  //registring login event
  emitUserLoginEvent(_id: User): void {
    this.server.emit('is-logged', { _id });
    console.log('usuario logado', _id);
  }

  //registring update event
  emitUpdateUserEvent(_id: string) {
    this.server.emit('update-user', _id);
    console.log(_id, 'usuario atualizado');
  }

  //registring delete event
  emitRemoveUserEvent(id: string) {
    this.server.emit('remove-user', id);
    console.log('usuario removido', id);
  }
}
