import { PageOptionsDto } from './page-options.dto';

export class PageMetaDto {
    total: number;
    lastPage: number;
    currentPage: number;
    perPage: number;
    prev: string | null;
    next: string | null;
  
    constructor(itemCount: number, pageOptionsDto: PageOptionsDto, baseUrl: string) {
      this.total = itemCount;
      this.perPage = pageOptionsDto.perPage;
      this.currentPage = pageOptionsDto.page;
      this.lastPage = Math.ceil(itemCount / pageOptionsDto.perPage);
  
      // Menggunakan page query parameter dengan baseUrl yang diberikan
      this.prev = this.currentPage > 1 ? `${baseUrl}?page=${this.currentPage - 1}` : null;
      this.next = this.currentPage < this.lastPage ? `${baseUrl}?page=${this.currentPage + 1}` : null;
    }
  }