import { NetState } from '../../shared/NetState'
import { PA_Join, LogicAction } from '../../shared/types.general'
import { Queue } from 'essential-data-structures'

export function Join(netState: NetState, logicActions: Queue<LogicAction>, playerAction: PA_Join) {
  const playerAlreadyInGame = netState.state.players.getWhere('name', playerAction.name) !== undefined
  if (!playerAlreadyInGame) {
    logicActions.enqueue({
      kind: 'Join',
      name: playerAction.name,
    })
  }
}
