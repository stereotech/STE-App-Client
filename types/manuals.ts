export interface ManualPage {
    attrs: { title: string, description: string }
    body: string
}

export interface Manual {
    path: string
    section: string
    page: ManualPage
}

export interface ManualSection {
    name: string,
    section: string,
    image: string
    manuals: Manual[]
}

export const manualsPaths: { name: string, section: string, image: string, paths: string[] }[] = [
    {
        section: 'ste320',
        name: 'STE320',
        image: 'manuals/banner.webp',
        paths: [
            '1-introduction',
            '2-quickstart',
            '3-work',
            '4-service',
            '5-materials'
        ]
    }
]