import { NetState } from './shared/NetState'
import { createServer, createAIClient } from './server'
import { createHumanClient } from './client'

const netState = new NetState('Shared')

createServer(netState)
createHumanClient(netState, true)
createAIClient(netState)
