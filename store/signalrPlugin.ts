import { HubConnectionBuilder } from '@aspnet/signalr'

export const InitSignalR = (store) => {
    let connection = new HubConnectionBuilder().withUrl(store.apiUrl).build()
    connection.on("CurrentState", (currentStates) => {

    })
    connection.on("FilesChanged", () => {
        store.dispatch()
    })
}
