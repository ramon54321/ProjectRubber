import { NetState } from '../../shared/NetState'
import { PA_Spawn, LogicAction } from '../../shared/types.general'
import { Queue } from 'essential-data-structures'

export function Spawn(netState: NetState, logicActions: Queue<LogicAction>, playerAction: PA_Spawn) {
  logicActions.enqueue({
    kind: 'Spawn',
    entityKind: playerAction.entityKind,
    position: playerAction.position,
  })
}
