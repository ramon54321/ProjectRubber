import { PlayerAction, LogicAction } from '../shared/types'
import { Queue } from 'essential-data-structures'
import { NetState } from '../shared/NetState'

export class LogicEngine {
  step(
    netState: NetState,
    playerActions: Queue<PlayerAction>,
  ): Queue<LogicAction> {
    const logicActions = new Queue<LogicAction>()
    logicActions.enqueue({ kind: 'Step' })

    playerActions.dequeueEach((playerAction) => {
      if (playerAction.kind === 'Spawn') {
        logicActions.enqueue({
          kind: 'Spawn',
          entityKind: playerAction.entityKind,
          position: playerAction.position,
        })
      } else {
        console.log('SERVER: LogicEngine: Unknown PlayerAction', playerAction.kind)
      }
    })

    return logicActions
  }
}
