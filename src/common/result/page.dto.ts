import { PageMetaDto } from './page-meta.dto';

export class PageDto<T> {
  meta: PageMetaDto;
  data: T[];

  constructor(pageMetaDto: PageMetaDto, data: T[]) {
    this.meta = pageMetaDto;
    this.data = data;
  }
}
