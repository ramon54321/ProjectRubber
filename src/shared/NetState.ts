import { LogicAction, SystemSide } from './types'

export class NetState {
  private _systemSide
  private _state = {
    logicActionHistory: [],
    logicSteps: 0,
  }
  constructor(systemSide: SystemSide) {
    this._systemSide = systemSide
    console.log('Creating NetState')
  }
  apply(logicAction: LogicAction) {
    console.log(this._systemSide, 'NETSTATE: Applying', logicAction.kind)
    this._state.logicActionHistory.push(logicAction)
    if (logicAction.kind === 'Step') {
      this._state.logicSteps++
    } else {
      console.log(this._systemSide, 'NETSTATE: Unknown LogicAction', logicAction.kind)
    }
  }
}
