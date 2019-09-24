export interface Material{
    id: number,
    metadata: metadata,
    properties: Properties
}

export interface name{
    brand:string,
    materialName: string
    color : string
}

export interface metadata{
 name: name,
 colorCode: string,
 version: string,
 description: string,
 adhesionInfo: string
}

export interface Properties{
    density: number
    // diameter: number
}