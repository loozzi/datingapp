import { Component, OnInit } from '@angular/core';
import { Pagination } from '../_models/pagination';
import { MessageService } from '../_services/message.service';
import { Message } from '../_models/message';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-messages',
  templateUrl: './messages.component.html',
  styleUrls: ['./messages.component.css'],
})
export class MessagesComponent implements OnInit {
  messages: Message[] | undefined = [];
  pagination?: Pagination;
  container = 'Unread';
  pageNumber = 1;
  pageSize = 5;

  constructor(
    private messageService: MessageService,
    private toastr: ToastrService
  ) {}

  ngOnInit() {
    this.loadMessages();
  }

  loadMessages() {
    this.messageService
      .getMessages(this.pageNumber, this.pageSize, this.container)
      .subscribe((response) => {
        this.messages = response.result;
        this.pagination = response.pagination;
      });
  }

  handlePageEvent(event: any) {
    this.pageNumber = event.pageIndex + 1;
    this.loadMessages();
  }

  setContainer(container: string) {
    this.container = container;
    this.loadMessages();
  }

  deleteMessage(id: number) {
    this.messageService.deteteMessage(id).subscribe(() => {
      this.messages?.splice(
        this.messages?.findIndex((message) => message.id === id),
        1
      );
      this.toastr.success('Delete message successfully');
    });
  }
}
