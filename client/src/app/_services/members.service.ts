import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, map, of } from 'rxjs';
import { environment } from 'src/environment/environment';
import { Member } from '../_models/member';

@Injectable({
  providedIn: 'root',
})
export class MembersService {
  baseUrl = environment.apiUrl;
  members: Member[] = [];

  constructor(private http: HttpClient) {}

  getMembers(): Observable<Member[]> {
    if (this.members.length > 0) return of(this.members);
    return this.http.get<Member[]>(this.baseUrl.concat('users')).pipe(
      map((members) => {
        this.members = members;
        return members;
      })
    );
  }

  getMember(username: string): Observable<Member> {
    const member = this.members.find((m) => m.userName === username);
    if (member) return of(member);

    return this.http.get<Member>(
      this.baseUrl.concat('users/').concat(username)
    );
  }

  updateMember(member?: Member) {
    return this.http.put(this.baseUrl.concat('users/'), member).pipe(
      map(() => {
        if (member) {
          const index = this.members.indexOf(member);
          this.members[index] = member;
        }
      })
    );
  }

  setMainPhoto(photoId: number): Observable<boolean> {
    return this.http
      .put(
        this.baseUrl.concat('users/set-main-photo/').concat(photoId.toString()),
        {}
      )
      .pipe(map(() => true));
  }

  deletePhoto(photoId: number): Observable<boolean> {
    return this.http
      .delete(
        this.baseUrl.concat('users/delete-photo/').concat(photoId.toString())
      )
      .pipe(map(() => true));
  }
}
