

const printers = [
    {
        id: 'st-aaa',
        model: 'STE320',
        name: 'ST-AAA',
        isLocal: true,
        address: '192.168.0.100',
        apiKey: '',
        octoApiKey: '',
        role: 'host'
    }
]

const printJobs = [
    {
        id: 1,
        name: 'job1',
        description: '',
        creationTime: Date.now(),
        fileUri: 'file.gcode',
        succesful: true,
        lastPrint: Date.now(),
        printers: []
    },
    {
        id: 2,
        name: 'job2',
        description: '',
        creationTime: Date.now(),
        fileUri: 'Storage/File_1.gcode',
        printers: ['st-aaa']
    }
]

const scannerResults = [
    {
        id: 'st-ddd',
        model: 'STE320',
        name: 'ST-DDD',
        role: 'host',
        ipAddress: '192.168.0.200'
    },
    {
        id: 'st-eee',
        model: 'STE320',
        name: 'ST-EEE',
        role: 'host',
        ipAddress: '192.168.0.20'
    }
]

const settings = {
    systemId: 'st-aaa',
    firstLaunch: true,
    avaliableLanguages: ['English', 'Русский'],
    language: 'English',
    storageTotal: 6864843434384,
    storageFree: 3564684646846,
    dateTime: 1550665494
}

const networks = [
    {
        id: 'network_8484442',
        name: 'Wifi 1',
        security: true,
        state: 'online',
        strength: 85
    },
    {
        id: 'network_8484443',
        name: 'Wifi 2',
        security: true,
        state: 'ready',
        strength: 50
    }
]

const connectedMethod = 'WIFI'

const localStorage = {
    children: [
        {
            date: Date.now(),
            display: 'File_1.gcode',
            hash: 'ab4dfcda52ce54a64dcde43cfb2417013b4f68e1',
            name: 'File_1.gcode',
            size: 15315451,
            origin: 'st_aaa',
            path: '/Storage/File_1.gcode',
            type: 'machinecode',
            typePath: ['machinecode', 'gcode']
        }
    ],
    display: 'Storage',
    name: 'Storage',
    origin: 'st-aaa',
    path: 'Storage',
    size: 4354654843,
    type: 'folder',
    typePath: ['folder']
}

const usbs = [
    {
        children: [
            {
                date: Date.now(),
                display: 'File_2.gcode',
                hash: 'ab4dfcda52ce54a64dcde43cfb2417013b4f68e1',
                name: 'File_2.gcode',
                size: 15315451,
                origin: 'st-aaa',
                path: '/USB/File_2.gcode',
                type: 'machinecode',
                typePath: ['machinecode', 'gcode']
            }
        ],
        display: 'Storage',
        name: 'Storage',
        origin: 'st-aaa',
        path: 'USB',
        size: 4354654843,
        type: 'folder',
        typePath: ['folder']
    },
    {
        children: [
            {
                date: Date.now(),
                display: 'File_2.gcode',
                hash: 'ab4dfcda52ce54a64dcde43cfb2417013b4f68e1',
                name: 'File_2.gcode',
                size: 15315451,
                origin: 'st-bbb',
                path: '/USB/File_2.gcode',
                type: 'machinecode',
                typePath: ['machinecode', 'gcode']
            }
        ],
        display: 'Storage',
        name: 'Storage',
        origin: 'st-bbb',
        path: 'USB',
        size: 4354654843,
        type: 'folder',
        typePath: ['folder']
    }
]

export default function (req, res, next) {
    res.writeHead(200, { 'Content-Type': 'application/json' })
    if (req.url === '/jobs') {
        res.end(JSON.stringify(printJobs))
    }
    else if (req.url === '/printers') {
        res.end(JSON.stringify(printers))
    }
    else if (req.url === '/printers/state') {
        let status = [
            {
                id: 'st-aaa',
                stateText: 'Printing',
                bed: {
                    actual: 60 + Math.random() * 5,
                    target: 60,
                    offset: 0
                },
                tool0: {
                    actual: 218 + Math.random() * 4,
                    target: 220,
                    offset: 0
                },
                tool1: {
                    actual: 43 + Math.random() * 4,
                    target: 0,
                    offset: 0
                },
                job: {
                    estimatedPrintTime: 4453.447533993765,
                    filment: {
                        tool0: {
                            length: 3482.341989999999,
                            volume: 0
                        }
                    },
                    file: {
                        date: 1548750780,
                        display: 'CFFFP_крышка.gcode',
                        name: 'CFFFP_крышка.gcode',
                        origin: 'st-aaa',
                        path: 'Storage/CFFFP_крышка.gcode',
                        size: 1124869
                    }
                },
                progress: {
                    completion: 88.58151482528189,
                    filepos: 996426,
                    printTime: 4488,
                    printTimeLeft: 543,
                    printTimeLeftOrigin: 'estimate'
                }
            }
        ]
        res.end(JSON.stringify(status))
    }
    else if (req.url === '/scanner') {
        res.end(JSON.stringify(scannerResults))
    }
    else if (req.url === '/system') {
        res.end(JSON.stringify(settings))
    }
    else if (req.url === '/storage/local') {
        res.end(JSON.stringify(localStorage))
    }
    else if (req.url === '/storage/usb') {
        res.end(JSON.stringify(usbs))
    }
    else if (req.url === '/network') {
        res.end(connectedMethod)
    }
    else if (req.url === '/network/wifi') {
        res.end(JSON.stringify(networks))
    }
    next()
}