import { NetClient } from '../shared/NetClient'
import { NetState } from '../shared/NetState'

export class AIClient extends NetClient {
  constructor(netState: NetState, isReadOnlyState: boolean) {
    super((message) => {
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