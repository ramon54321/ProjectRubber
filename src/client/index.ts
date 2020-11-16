import { NetState } from '../shared/NetState'
import { HumanClient } from './HumanClient'

export function createHumanClient(netState: NetState, isSharedState: boolean) {
  console.log('Creating Human Client')
  const humanClient = new HumanClient(netState, isSharedState)
}
