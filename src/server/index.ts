import { NetState } from '../shared/NetState'
import { NetServer } from '../shared/NetServer'
import { LogicEngine } from './LogicEngine'
import { AIClient } from './AIClient'
import { PlayerAction, ClientMessage } from '../shared/types.general'
import { Queue } from 'essential-data-structures'

export function createServer(netState: NetState) {
  console.log('Creating Server')
  const playerActions = new Queue<PlayerAction>()

  const netServer = new NetServer()
  netServer.on('message', (connection, message: ClientMessage) => {
    if (message.kind === 'PlayerAction') {
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
  const stepElement = document.getElementById('button-step')
  stepElement.onclick = () => step()
}

export function createAIClient(netState: NetState) {
  console.log('Creating AI Client')
  const aiClient = new AIClient(netState, true)
  aiClient.on('connect', (connection) =>
    aiClient.sendPlayerAction({ kind: 'Join', name: 'AI Player' }),
  )
}
