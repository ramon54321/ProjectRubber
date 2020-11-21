import { NetClient } from '../shared/NetClient'
import { NetState } from '../shared/NetState'
import { ServerMessage } from '../shared/types'

export class AIClient extends NetClient {
  constructor(netState: NetState, isReadOnlyState: boolean) {
    super()
    this.on('message', (message: ServerMessage) => {
      if (message.kind === 'LogicAction' && !isReadOnlyState) {
        netState.apply(message.action)
      }
    })

    /**
     * TODO: Create some brain to call 'this.sendPlayerAction'. Basically instead of HumanClient's Input module
     */
    // const brain = new Brain((playerAction: PlayerAction) => this.sendPlayerAction(playerAction))
  }
}