import * as signalR from '@microsoft/signalr';
import { Injectable } from '@angular/core';
@Injectable({
    providedIn: 'root'
})


export class SignalRService {

    constructor() { }

    private hubConnection!: signalR.HubConnection;

    startConnection() {
        this.hubConnection = new signalR.HubConnectionBuilder()
            .withUrl('https://localhost:7285/chatHub')
            .withAutomaticReconnect()
            .build();

        this.hubConnection
            .start()
            .then(() => console.log('Connected'))
            .catch(err => console.log(err));

        this.hubConnection.onclose(err => {
            console.log('Disconnected', err);
        });

        this.hubConnection.onreconnecting(err => {
            console.log('Reconnecting...', err);
        });

        this.hubConnection.onreconnected(id => {
            console.log('Reconnected', id);
        });
    }

    receiveMessage() {
    this.hubConnection.on('ReceiveMessage', (user: string, message: string) => {
        console.log(user, message);
    });
}

}

