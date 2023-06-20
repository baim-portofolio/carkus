export class PageOptionsDto {
  page: number;
  perPage: number;

  constructor(page: number, perPage: number) {
    this.page = page;
    this.perPage = perPage;
  }
}