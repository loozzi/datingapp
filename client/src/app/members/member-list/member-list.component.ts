import { Component, OnInit } from '@angular/core';
import { take } from 'rxjs';
import { User } from 'src/app/_models/User';
import { Member } from 'src/app/_models/member';
import { Pagination } from 'src/app/_models/pagination';
import { UserParams } from 'src/app/_models/userParams';
import { AccountService } from 'src/app/_services/account.service';
import { MembersService } from 'src/app/_services/members.service';

@Component({
  selector: 'app-member-list',
  templateUrl: './member-list.component.html',
  styleUrls: ['./member-list.component.css'],
})
export class MemberListComponent implements OnInit {
  members: Member[] | undefined = [];
  pagination: Pagination | undefined;
  userParams: UserParams = new UserParams({});
  user?: User;
  genderList = [
    { value: 'male', display: 'Males' },
    { value: 'female', display: 'Females' },
  ];

  constructor(private memberService: MembersService) {
    this.userParams = memberService.getUserParams() || new UserParams({});
  }

  ngOnInit(): void {
    this.loadMember();
  }

  loadMember() {
    if (this.userParams) {
      this.memberService.setUserParams(this.userParams);
      this.memberService.getMembers(this.userParams).subscribe((response) => {
        this.members = response.result;
        this.pagination = response.pagination;
      });
    }
  }

  handlePageEvent(event: any) {
    if (this.userParams) {
      this.userParams.pageNumber = event.pageIndex + 1;
      this.loadMember();
    }
  }

  resetFilter() {
    if (this.user) {
      this.userParams = new UserParams(this.user);
      this.loadMember();
    }
  }

  setOrderBy(orderBy: string) {
    if (orderBy !== this.userParams.orderBy) {
      this.userParams.orderBy = orderBy;
      this.loadMember();
    }
  }
}
