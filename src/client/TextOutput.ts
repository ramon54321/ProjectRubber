import { NetState } from '../shared/NetState'
import { LocalState } from './types'

export class TextOutput {
  private _netState: NetState
  private _localState: LocalState
  private _humanClientRootElement: HTMLElement
  private _output: HTMLElement
  constructor(netState: NetState, localState: LocalState) {
    this._netState = netState
    this._localState = localState
    this._humanClientRootElement = document.getElementById('human-client-root')
    
    const outputContainerElement = document.createElement('div')
    outputContainerElement.setAttribute('id', 'output-container')
    this._humanClientRootElement.appendChild(outputContainerElement)

    const preElement = document.createElement('pre')
    outputContainerElement.appendChild(preElement)

    this._output = document.createElement('code')
    this._output.setAttribute('id', 'output')
    preElement.appendChild(this._output)

    window.requestAnimationFrame(this.draw.bind(this))
  }
  draw() {
    window.requestAnimationFrame(this.draw.bind(this))

    this._output.innerText = JSON.stringify(this._netState, null, 2) + JSON.stringify(this._localState, null, 2)
  }
}
