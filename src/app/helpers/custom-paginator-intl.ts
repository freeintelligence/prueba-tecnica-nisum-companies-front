import { Injectable } from '@angular/core';
import { MatPaginatorIntl } from '@angular/material/paginator';

@Injectable()
export class CustomPaginatorIntl extends MatPaginatorIntl {
  override getRangeLabel = (page: number, pageSize: number, length: number): string => {
    const startIndex = page * pageSize + 1;
    const endIndex = startIndex + pageSize - 1;
    return `${startIndex}–${endIndex}`;
  };
}
