import { WebSocketGateway, WebSocketServer } from "@nestjs/websockets";
import { Server } from "socket.io";

@WebSocketGateway(3002,{    
    cors: {
        origin: '*'
    }
})

export class ServiceGateway {
    @WebSocketServer()
    server: Server

    //registring login event
    emitUserLoginEvent(): void {
        this.server.emit('is-logged')
        console.log('usuario logado')
    }

    //registring update event
    emitUpdateUserEvent(_id: string) {
        this.server.emit('update-user', _id)
        console.log(_id, 'usuario atualizado')
    }

    //registring delete event
    emitRemoveUserEvent(email: string) {
        this.server.emit('remove-user', email)
        console.log('usuario removido')
    }
}