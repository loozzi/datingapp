import { Component, OnInit } from '@angular/core';
import { Member } from '../_models/member';
import { MembersService } from '../_services/members.service';
import { LikeParams } from '../_models/likeParams';
import { Pagination } from '../_models/pagination';

@Component({
  selector: 'app-lists',
  templateUrl: './lists.component.html',
  styleUrls: ['./lists.component.css'],
})
export class ListsComponent implements OnInit {
  members: Partial<Member[]> | undefined = [];
  likeParams: LikeParams = new LikeParams();
  pagination?: Pagination;

  constructor(private memberService: MembersService) {}

  ngOnInit(): void {
    this.loadLikes();
  }

  loadLikes() {
    this.memberService.getLikes(this.likeParams).subscribe((res) => {
      if (res) {
        this.members = res.result;
        this.pagination = res.pagination;
      }
    });
  }

  setPredicate(predicate: string) {
    if (this.likeParams.predicate !== predicate) {
      this.likeParams.predicate = predicate;
      this.likeParams = new LikeParams(predicate);
      this.loadLikes();
    }
  }

  handlePageEvent(event: any) {
    if (this.likeParams) {
      this.likeParams.pageNumber = event.pageIndex + 1;
      this.loadLikes();
    }
  }
}
