import { Component } from '@angular/core';

@Component({
  selector: 'app-messages',
  templateUrl: './messages.component.html',
  styleUrls: ['./messages.component.css'],
})
export class MessagesComponent {
  users: any = [
    { username: 'Thaocute', email: 'loozzi.tv@gmailcom' },
    { username: 'aihihi', email: 'aihihi.tv@gmailcom' },
    { username: 'euyher', email: 'euyher.tv@gmailcom' },
    { username: 'eredsfs', email: 'eredsfs.tv@gmailcom' },
  ];
}
