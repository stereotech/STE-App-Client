export interface Networking {
  connectedMethod: string
  networks: Network[]
}

export interface Network {
  id: string
  state: string
  name: string
  strength: number
  secutiry: boolean
}
