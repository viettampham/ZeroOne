import { Component } from '@angular/core';
import { SignalRService } from '../services/signalr.service';

@Component({
  selector: 'app-chat',
  standalone: true,
  imports: [],
  templateUrl: './chat.component.html',
  styleUrl: './chat.component.scss'
})
export class ChatComponent {
  constructor(private signalRService: SignalRService) {}
  ngOnInit(): void {
    this.signalRService.startConnection();
    this.signalRService.receiveMessage();
  }
}
