export interface Vec2 {
  x: number
  y: number
}

export type EntityKind = 'Infantry' | 'Scout'

export type SystemSide = 'Client' | 'Server' | 'Shared'

export type PlayerAction = PA_Join | PA_Spawn | PA_Move
export interface PA_Join {
  kind: 'Join'
  name: string
}
export interface PA_Spawn {
  kind: 'Spawn'
  entityKind: EntityKind
  position: Vec2
}
export interface PA_Move {
  kind: 'Move'
  entityId: string
  destination: Vec2
}

export type LogicAction = LA_Step | LA_Join | LA_Spawn | LA_Move
export interface LA_Step {
  kind: 'Step'
}
export interface LA_Join {
  kind: 'Join'
  name: string
}
export interface LA_Spawn {
  kind: 'Spawn'
  entityKind: EntityKind
  position: Vec2
}
export interface LA_Move {
  kind: 'Move'
  entityId: string
  destination: Vec2
}

export type ServerMessage = SM_Info | SM_LogicAction
export interface SM_Info {
  kind: 'Info'
  info: any
}
export interface SM_LogicAction {
  kind: 'LogicAction'
  action: LogicAction
}

export type ClientMessage = CM_PlayerAction
export interface CM_PlayerAction {
  kind: 'PlayerAction'
  action: PlayerAction
}
