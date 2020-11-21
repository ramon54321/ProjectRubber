import { LogicAction, SystemSide } from './types.general'
import { Player } from './types.NetState'
import { IndexedMap } from 'essential-data-structures'

export class NetState {
  private _systemSide
  state = {
    logicActionHistory: [],
    logicSteps: 0,
    players: new IndexedMap<Player>(['name']),
  }
  constructor(systemSide: SystemSide) {
    this._systemSide = systemSide
    console.log('Creating NetState')
  }
  apply(logicAction: LogicAction) {
    console.log(this._systemSide, 'NETSTATE: Applying', logicAction.kind)
    this.state.logicActionHistory.push(logicAction)

    if (logicAction.kind === 'Step') {
      this.state.logicSteps++
    } else if (logicAction.kind === 'Join') {
      this.state.players.add({ name: logicAction.name })
    } else {
      console.log(
        this._systemSide,
        'NETSTATE: Unknown LogicAction',
        logicAction.kind,
      )
    }
  }
}
