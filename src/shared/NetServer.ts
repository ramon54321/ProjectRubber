import * as WebSocket from "websocket"
import * as http from 'http'
import { ClientMessage, LogicAction, ServerMessage } from "../shared/types"

export class NetServer {
  private _wsServer: any
  private _onMessage: (connection: any, message: ClientMessage) => void

  constructor(onMessage: (connection: any, message: ClientMessage) => void) {
    this._onMessage = onMessage

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
      connection.on('message', data => this._onMessage(connection, JSON.parse(data.utf8Data)))
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