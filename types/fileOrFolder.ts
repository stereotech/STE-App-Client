export interface Refs {
  download: string
  resource: string
}

export interface Dimensions {
  depth: number
  height: number
  width: number
}

export interface ToolFilament {
  length: number
  volume: number
}

export interface Filament {
  tool0: ToolFilament
  tool1: ToolFilament
}

export interface PrintingArea {
  maxX: number
  maxY: number
  maxZ: number
  minX: number
  minY: number
  minZ: number
}

export interface GCodeAnalysis {
  dimensions: Dimensions
  estimatedPrintTime: number
  filament: Filament
  printingArea: PrintingArea
}

export interface FileOrFolder {
  children?: FileOrFolder[]
  date?: number
  display: string
  gCodeAnalysis?: GCodeAnalysis
  hash?: string
  name: string
  origin: string // Printer name
  path: string
  refs?: Refs
  size: number
  type: string // USB or local
  typePath: string[]
}
