export interface ManualPage {
    attrs: { title: string, description: string }
    body: string
}

export interface Manual {
    path: string
    section: string
    page: ManualPage
}

export const manualsPaths: { section: string, paths: string[] }[] = [
    {
        section: 'ste320',
        paths: [
            '1-introduction',
            '2-quickstart',
            '3-work',
            '4-service',
            '5-materials'
        ]
    }
]