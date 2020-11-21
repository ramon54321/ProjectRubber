import { PlayerAction, LogicAction } from '../shared/types.general'
import { Queue } from 'essential-data-structures'
import { NetState } from '../shared/NetState'
import * as PlayerActionHandlers from './PlayerActionHandlers'

export class LogicEngine {
  step(
    netState: NetState,
    playerActions: Queue<PlayerAction>,
  ): Queue<LogicAction> {
    const logicActions = new Queue<LogicAction>()
    logicActions.enqueue({ kind: 'Step' })
    
    playerActions.dequeueEach((playerAction) => {
      const playerActionHandler = PlayerActionHandlers[playerAction.kind]
      if (playerActionHandler !== undefined) {
        playerActionHandler(netState, logicActions, playerAction)
      } else {
        console.log(
          'SERVER: LogicEngine: Unknown PlayerAction',
          playerAction.kind,
        )
      }
    })

    return logicActions
  }
}
