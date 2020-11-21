import * as WebSocket from "websocket"
import * as http from 'http'
import { EventEmitter } from 'events'
import { ClientMessage, LogicAction, ServerMessage } from "../shared/types"

export class NetServer extends EventEmitter {
  private _wsServer: any

  constructor() {
    super()

    // Listen for Clients
    const server = http.createServer()
    server.listen(8080)
    this._wsServer = new WebSocket.server({
      httpServer: server,
      autoAcceptConnections: true
    })

    // Listen for ClientMessages
    this._wsServer.on('connect', connection => {
      console.log('SERVER: Client Connected')
      connection.on('message', data => this.emit('message', connection, JSON.parse(data.utf8Data) as ClientMessage))
    })

    this._wsServer.on('disconnect', connection => {
      console.log('SERVER: Client Disconnected', connection)
      this.emit('disconnect', connection)
    })
  }

  broadcastLogicAction(logicAction: LogicAction) {
    this.broadcastMessage({
      kind: 'LogicAction',
      action: logicAction
    })
  }

  private broadcastMessage(serverMessage: ServerMessage) {
    this._wsServer.broadcast(JSON.stringify(serverMessage))
  }
}