import { Component, Input, OnInit, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Message } from 'src/app/_models/message';
import { MessageService } from 'src/app/_services/message.service';

@Component({
  selector: 'app-member-messages',
  templateUrl: './member-messages.component.html',
  styleUrls: ['./member-messages.component.css'],
})
export class MemberMessagesComponent implements OnInit {
  @ViewChild('messageForm') messageForm: NgForm | undefined;
  @Input() username?: string;
  messages: Message[] = [];
  content: string = '';

  constructor(private messageService: MessageService) {}

  ngOnInit(): void {
    this.loadMessages();
  }

  loadMessages() {
    if (this.username) {
      this.messageService
        .getMessageThread(this.username)
        .subscribe((message: Message[]) => {
          this.messages = message;
        });
    }
  }

  sendMessage() {
    if (this.username) {
      this.messageService
        .sendMessage(this.username, this.content)
        .subscribe((message) => {
          this.messages = [message, ...this.messages];
          this.messageForm?.reset();
        });
    }
  }
}
