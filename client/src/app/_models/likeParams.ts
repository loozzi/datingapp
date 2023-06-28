export class LikeParams {
  pageNumber: number = 1;
  pageSize: number = 5;
  predicate: string = 'liked';

  constructor(predicated: string = 'liked') {
    this.predicate = predicated;
  }
}
