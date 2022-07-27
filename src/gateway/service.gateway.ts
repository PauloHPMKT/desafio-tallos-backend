import { MessageBody, SubscribeMessage, WebSocketGateway, WebSocketServer } from "@nestjs/websockets";
import { Server } from "socket.io";

@WebSocketGateway(3002,{    
    cors: {
        origin: '*'
    }
})

export class ServiceGateway {
    @WebSocketServer()
    server: Server

    @SubscribeMessage('event-connection')
    handleEvent(@MessageBody() data: string): string {
        console.log(data, 'aqui vai um teste')
        return data
    }

    emitUserLoginEvent() {
        this.server.emit('is-logged')
        console.log('usuario logado')
    }
}