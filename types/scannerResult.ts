
export interface ScannerResult {
  id: string
  name: string
  model: string
  ipAddress: string
  role: string
  hostname?: string
  printers: number
  updateTime?: number
}

export interface ResolvedDevice {
  domain: string
  type: string
  name: string
  port: number
  hostname: string
  ipv4Addresses: string[]
  ipv6Addresses: string[]
  txtRecord: any
}
