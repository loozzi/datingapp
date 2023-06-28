import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, map, of } from 'rxjs';
import { environment } from 'src/environment/environment';
import { Member } from '../_models/member';
import { PaginatedResult } from '../_models/pagination';
import { UserParams } from '../_models/userParams';
import { AccountService } from './account.service';
import { take } from 'rxjs';
import { User } from '../_models/User';
import { LikeParams } from '../_models/likeParams';

@Injectable({
  providedIn: 'root',
})
export class MembersService {
  baseUrl = environment.apiUrl;
  members: Member[] = [];
  membersCache = new Map();
  user?: User;
  userParams?: UserParams;

  constructor(
    private http: HttpClient,
    private accountService: AccountService
  ) {
    this.accountService.currentUser$.pipe(take(1)).subscribe((user) => {
      if (user) {
        this.user = user;
        this.userParams = new UserParams(user);
      }
    });
  }

  addLike(username: string) {
    return this.http.post(this.baseUrl.concat('likes/').concat(username), {});
  }

  getLikes(likeParams: LikeParams) {
    let params = this.getPaginationHeader(
      likeParams.pageNumber,
      likeParams.pageSize
    );
    params = params.append('predicate', likeParams.predicate);

    return this.getPaginatedResult<Partial<Member[]>>(
      this.baseUrl.concat('likes'),
      params
    );
  }

  setUserParams(params: UserParams) {
    this.userParams = this.userParams;
  }

  getMembers(userParams: UserParams) {
    var response = this.membersCache.get(Object.values(userParams).join('-'));
    if (response) {
      return of(response);
    }

    let params = this.getPaginationHeader(
      userParams.pageNumber,
      userParams.pageSize
    );

    params = params.append('minAge', userParams.minAge.toString());
    params = params.append('maxAge', userParams.maxAge.toString());
    params = params.append('gender', userParams.gender || '');
    params = params.append('orderBy', userParams.orderBy);

    return this.getPaginatedResult<Member[]>(
      this.baseUrl.concat('users'),
      params
    ).pipe(
      map((response) => {
        this.membersCache.set(Object.values(userParams).join('-'), response);
        this.members = [...(response.result || []), ...this.members];
        return response;
      })
    );
  }

  getUserParams() {
    return this.userParams;
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

  private getPaginatedResult<T>(url: string, params: HttpParams) {
    const paginatedResult: PaginatedResult<T> = new PaginatedResult<T>();
    return this.http
      .get<T>(url, {
        observe: 'response',
        params: params,
      })
      .pipe(
        map((response) => {
          if (response.body) {
            paginatedResult.result = response.body;
            if (response.headers.get('Pagination')) {
              paginatedResult.pagination = JSON.parse(
                response.headers.get('Pagination') || '{}'
              );
            }
          }
          return paginatedResult;
        })
      );
  }

  private getPaginationHeader(pageNumber: number, pageSize: number) {
    let params = new HttpParams();

    params = params.append('pageNumber', pageNumber.toString());
    params = params.append('pageSize', pageSize.toString());

    return params;
  }
}
