import { Input } from './Input'
import { Output } from './Output'
import { NetClient } from '../shared/NetClient'
import { LocalState } from './types'
import { PlayerAction } from '../shared/types'
import { NetState } from '../shared/NetState'

export class HumanClient extends NetClient {
  constructor(netState: NetState, isSharedState: boolean) {
    super((message) => {
      if (message.kind === 'Info') {
        console.log('CLIENT: Server info -', message.info)
      } else if (message.kind === 'LogicAction' && !isSharedState) {
        netState.apply(message.action)
      }
    })
    const localState: LocalState = {
      keyDown: {
    
      }
    }
    const input = new Input(localState, (playerAction: PlayerAction) => this.sendPlayerAction(playerAction))
    const output = new Output(netState, localState)
  }
}