import { LocalState } from './types'
import { PlayerAction, ClientMessage } from '../shared/types'

export class Input {
  private _sendPlayerAction: (playerAction: PlayerAction) => void
  private _sendJoin: () => void
  private _input: HTMLElement

  constructor(
    localState: LocalState,
    sendPlayerAction: (playerAction: PlayerAction) => void,
    sendJoin: () => void,
  ) {
    this._sendPlayerAction = sendPlayerAction
    this._sendJoin = sendJoin
    this._input = document.getElementById('input')

    this.createButtonJoin()
    this.createButtonPlayerAction('Spawn', {
      kind: 'Spawn',
      entityKind: 'Infantry',
      position: {
        x: 22,
        y: 31,
      },
    })
    this.createButtonPlayerAction('Move', {
      kind: 'Move',
      entityId: 'e1',
      destination: {
        x: 25,
        y: 21,
      },
    })

    window.onkeydown = (event: KeyboardEvent) => {
      localState.keyDown[event.key] = true
    }
    window.onkeyup = (event: KeyboardEvent) => {
      localState.keyDown[event.key] = false
    }
  }

  createButtonPlayerAction(text: string, onClickPlayerAction: PlayerAction) {
    const button = document.createElement('button')
    button.textContent = text
    button.onclick = () => this._sendPlayerAction(onClickPlayerAction)
    this._input.appendChild(button)
  }

  createButtonJoin() {
    const button = document.createElement('button')
    button.textContent = 'Join Game'
    button.onclick = this._sendJoin
    this._input.appendChild(button)
  }
}
