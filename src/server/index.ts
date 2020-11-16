import { NetState } from '../shared/NetState'
import { NetServer } from '../shared/NetServer'
import { LogicEngine } from './LogicEngine'
import { AIClient } from './AIClient'
import { PlayerAction } from '../shared/types'
import { Queue } from 'essential-data-structures'

export function createServer(netState: NetState) {
  console.log('Creating Server')
  const playerActions = new Queue<PlayerAction>()
  
  const netServer = new NetServer((connection, message) => {
    if (message.kind === 'Join') {
    } else if (message.kind === 'PlayerAction') {
      playerActions.enqueue(message.action)
    }
  })
  
  const logicEngine = new LogicEngine()
  
  function step() {
    const logicActions = logicEngine.step(netState, playerActions)
    logicActions.dequeueEach((logicAction) => {
      netState.apply(logicAction)
      netServer.broadcastLogicAction(logicAction)
    })
  }

  /**
   * Debug UI
   */
  const moveEntityElement = document.getElementById('button-move')
  moveEntityElement.onclick = () =>
    netServer.broadcastLogicAction({
      kind: 'Move',
      entityId: 'e1',
      destination: {
        x: 5,
        y: 2,
      },
    })

  const stepElement = document.getElementById('button-step')
  stepElement.onclick = () => step()
}

export function createAIClient(netState: NetState) {
  console.log('Creating AI Client')
  const aiClient = new AIClient(netState, true)
}




