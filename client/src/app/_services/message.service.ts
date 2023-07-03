import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environment/environment';
import { Message } from '../_models/message';
import { getPaginatedResult, getPaginationHeader } from './paginationHelper';

@Injectable({
  providedIn: 'root',
})
export class MessageService {
  baseUrl = environment.apiUrl;

  constructor(private http: HttpClient) {}

  getMessages(pageNumber: number, pageSize: number, container: string) {
    let params = getPaginationHeader(pageNumber, pageSize);
    params = params.append('container', container);

    return getPaginatedResult<Message[]>(
      this.baseUrl.concat('messages'),
      params,
      this.http
    );
  }

  getMessageThread(username: string) {
    return this.http.get<Message[]>(
      this.baseUrl.concat('messages/thread/').concat(username)
    );
  }

  sendMessage(username: string, content: string) {
    return this.http.post<Message>(this.baseUrl.concat('messages'), {
      recipientUsername: username,
      content: content,
    });
  }

  deteteMessage(id: number) {
    return this.http.delete(
      this.baseUrl.concat('messages/').concat(id.toString())
    );
  }
}
