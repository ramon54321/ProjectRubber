import { LocalState } from './types'
import { PlayerAction } from '../shared/types'

export class Input {
  private _sendPlayerAction: (playerAction: PlayerAction) => void
  private _input: HTMLElement

  constructor(
    localState: LocalState,
    sendPlayerAction: (playerAction: PlayerAction) => void,
  ) {
    this._sendPlayerAction = sendPlayerAction
    this._input = document.getElementById('input')

    this.createButton('Spawn', {
      kind: 'Spawn',
      entityKind: 'Infantry',
      position: {
        x: 22,
        y: 31,
      },
    })
    this.createButton('Move', {
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

  createButton(text: string, onClickPlayerAction: PlayerAction) {
    const button = document.createElement('button')
    button.textContent = text
    button.onclick = () => this._sendPlayerAction(onClickPlayerAction)
    this._input.appendChild(button)
  }
}
