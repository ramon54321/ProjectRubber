import { NetState } from '../../shared/NetState'
import { LocalState } from '../types'

export class BasicOutput {
  private _netState: NetState
  private _localState: LocalState
  private _humanClientRootElement: HTMLElement
  private _canvas: HTMLCanvasElement
  constructor(netState: NetState, localState: LocalState) {
    this._netState = netState
    this._localState = localState
    this._humanClientRootElement = document.getElementById('human-client-root')

    this._canvas = document.createElement('canvas')
    this._canvas.setAttribute('id', 'canvas')
    this._humanClientRootElement.appendChild(this._canvas)

    window.requestAnimationFrame(this.draw.bind(this))
  }
  draw() {
    window.requestAnimationFrame(this.draw.bind(this))
  }
}
