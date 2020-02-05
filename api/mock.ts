import { ServerMiddleware } from '@nuxt/types'
import { PrinterInfo, CurrentState } from '~/types/printer'
import { Settings } from '~/types/settings'
import { PrintJob } from '~/types/printJob'



const printers = [
    {
        id: 'st-aaa',
        model: 'STE320',
        name: 'ST-AAA',
        isLocal: true,
        isFiveAxis: false,
        address: '192.168.0.100',
        apiKey: '',
        octoApiKey: '',
        role: 'host'
    },
    {
        id: 'st-aab',
        model: 'STE520',
        name: 'ST-BBB',
        isLocal: false,
        isFiveAxis: true,
        address: '192.168.0.100',
        apiKey: '',
        octoApiKey: '',
        role: 'host'
    }
]

const printJobs: PrintJob[] = [
    {
        id: 1,
        name: 'job1',
        description: '',
        creationTime: Date.now(),
        fileUri: 'file.gcode',
        isFiveAxis: true,
        successful: true,
        lastPrintTime: Date.now(),
        state: 'Queued',
        printers: []
    },
    {
        id: 3,
        name: 'job3',
        description: '',
        isFiveAxis: true,
        creationTime: Date.now(),
        fileUri: 'Storage/File_1.gcode',
        successful: true,
        lastPrintTime: Date.now(),
        state: 'Queued',
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

const settings: Settings = {
    systemId: 'st-aaa',
    role: 'host',
    firstLaunch: false,
    avaliableLanguages: ['en', 'ru'],
    language: 'ru',
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
            display: 'File_3D.gcode',
            hash: 'ab4dfcda52ce54a64dcde43cfb2417013b4f68e1',
            name: 'File_3D.gcode',
            size: 15315451,
            origin: 'st_aaa',
            gcodeAnalysis: {
                isFiveAxis: false
            },
            path: '/Storage/File_3D.gcode',
            type: 'machinecode',
            typePath: ['machinecode', 'gcode'],
            refs: {
                download: 'localhost:3000/file3D.gcode',
            }
        },
        {
            date: Date.now(),
            display: 'File_5D.gcode',
            hash: 'ab4dfcda52ce54a64dcde43cfb2417013b4f68e1',
            name: 'File_5D.gcode',
            size: 15315451,
            origin: 'st_aaa',
            gcodeAnalysis: {
                isFiveAxis: true
            },
            path: '/Storage/File_5D.gcode',
            type: 'machinecode',
            typePath: ['machinecode', 'gcode'],
            refs: {
                download: 'localhost:3000/file5D.gcode',
            }
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


const apiMock: ServerMiddleware = function (req, res, next) {
    if (req.url === '/jobs') {
        res.end(JSON.stringify(printJobs))
    }
    else if (req.url === '/printers/') {
        let printers: PrinterInfo[] = [{
            id: 'st-aaa',
            model: 'STE320',
            name: 'ST-AAA',
            isLocal: true,
            address: '192.168.0.100',
            apiKey: '',
            octoApiKey: '',
            role: 'host',
            isFiveAxis: false
        },
        {
            id: 'st-aaa',
            model: 'STE520',
            name: 'ST-BBB',
            isLocal: false,
            address: '192.168.0.101',
            apiKey: '',
            octoApiKey: '',
            role: 'client',
            isFiveAxis: true
        }]
        res.end(JSON.stringify(printers))
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
    } else {
        next()
    }
}

export default apiMock