import { Component, OnInit } from '@angular/core';
import { SignalRService } from 'src/app/services/signal-r.service';

@Component({
  selector: 'atc-messages-output',
  templateUrl: './messages-output.component.html',
  styleUrls: ['./messages-output.component.css'],
})
export class MessagesOutputComponent implements OnInit {
  messages: Array<string>;
  isShown: boolean;

  constructor(private signalRService: SignalRService) {}
  ngOnInit(): void {
    this.signalRService.hubMessages.subscribe((messages: Array<string>) => {
      this.messages = messages;
      this.isShown = true;
      setTimeout(() => {
        this.isShown = false;
      }, 3000);
    });
  }
}
