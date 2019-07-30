
export interface ScannerResult {
  id: string
  name: string
  model: string
  ipAddress: string
  role: string
  hostname?: string
}

export interface ResolvedDevice {
  domain: string,
  type: string,
  name: string,
  port: number,
  hostname: string,
  ipv4Addresses: string[],
  ipv6Addresses: string[],
  txtRecord: any
}
