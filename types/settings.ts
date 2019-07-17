export interface Settings {
  systemId: string
  firstLaunch: boolean
  language: string
  //avaliableLanguages: string[] - старый тип
  avaliableLanguages: object[]
  dateTime: number
  storageTotal: number
  storageFree: number
}
