export interface Networking {
  connectedMethod: string
  address: string
  networks: Array<Network>
}

export interface Network {
  id: string
  state: string
  name: string
  strength: number
  security: boolean
}
