import * as WebSocket from 'websocket'
import { EventEmitter } from 'events'
import { ServerMessage, ClientMessage, PlayerAction } from './types'

export class NetClient extends EventEmitter {
  private _socket: any
  private _connection: any

  constructor() {
    super()

    // Connect to Server
    this._socket = new WebSocket.client()
    this._socket.connect('ws://localhost:8080/')

    // Listen for ServerMessages
    this._socket.on('connect', (connection) => {
      this._connection = connection
      this._connection.on('message', (message) => 
        this.emit('message', JSON.parse(message.utf8Data) as ServerMessage)
      )
      this.emit('connect', (connection) => this.emit('connect', connection))
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
    if (!this._connection) throw new Error('NET_ERROR: Trying to send message to server without a connection')
    this._connection.sendUTF(JSON.stringify(message))
  }
}
