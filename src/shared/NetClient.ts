import * as WebSocket from 'websocket'
import { ServerMessage, ClientMessage, PlayerAction } from './types'

export class NetClient {
  private _socket: any
  private _connection: any

  private _onMessage: (message: ServerMessage) => void

  constructor(onMessage: (message: ServerMessage) => void) {
    this._onMessage = onMessage

    // Connect to Server
    this._socket = new WebSocket.client()
    this._socket.connect('ws://localhost:8080/')

    // Listen for ServerMessages
    this._socket.on('connect', (connection) => {
      this._connection = connection
      this._connection.on('message', (message) =>
        this._onMessage(JSON.parse(message.utf8Data)),
      )
    })
  }

  sendPlayerAction(playerAction: PlayerAction) {
    this.sendMessage({
      kind: 'PlayerAction',
      action: playerAction,
    })
  }

  sendJoin() {
    this.sendMessage({
      kind: 'Join',
    })
  }

  private sendMessage(message: ClientMessage) {
    this._connection.sendUTF(JSON.stringify(message))
  }
}
