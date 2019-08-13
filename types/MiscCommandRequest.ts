export interface MiscCommandRequest {
  command: string

  red?: number
  green?: number
  blue?: number

  fanId?: number
  FanValue?: number

  tool0Temp?: number
  tool1Temp?: number
  bedTemp?: number

  flow?: number
  feed?: number

  x?: number
  y?: number
  z?: number
  a?: number
  b?: number
  c?: number

  homeHead?: boolean
  homeBed?: boolean
  homeRotary?: boolean

  toolId?: number
  ExtrudeAmount?: number
  RetractAmount?: number

  commandString?: string
}
