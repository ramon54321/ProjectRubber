import { NetState } from '../shared/NetState'
import { LocalState } from './types'

export class Output {
  private _netState: NetState
  private _localState: LocalState
  private _output: HTMLElement
  constructor(netState: NetState, localState: LocalState) {
    this._netState = netState
    this._localState = localState
    this._output = document.getElementById('output')

    window.requestAnimationFrame(this.draw.bind(this))
  }
  draw() {
    window.requestAnimationFrame(this.draw.bind(this))

    this._output.innerText = JSON.stringify(this._netState, null, 2) + JSON.stringify(this._localState, null, 2)
  }
}
