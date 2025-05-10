import { Component } from '@angular/core';
import {
  MatPaginatorIntl,
  MatPaginatorModule,
  PageEvent,
} from '@angular/material/paginator';
import { MatTableModule } from '@angular/material/table';
import { Company } from '../../../../models/company.model';
import {
  CompaniesService,
  GetCompaniesFiltersInterface,
} from '../../../../services/companies.service';
import { CustomPaginatorIntl } from '../../../../helpers/custom-paginator-intl';
import { NgIf } from '@angular/common';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatButtonModule } from '@angular/material/button';

@Component({
  selector: 'app-companies-table',
  imports: [
    MatPaginatorModule,
    MatTableModule,
    NgIf,
    MatProgressSpinnerModule,
    MatButtonModule,
  ],
  templateUrl: './table.component.html',
  styleUrl: './table.component.scss',
  providers: [{ provide: MatPaginatorIntl, useClass: CustomPaginatorIntl }],
})
export class TableComponent {
  public loading: boolean = false;
  public error: boolean = false;
  public companies: Company[] = [];
  public filters: GetCompaniesFiltersInterface = {};
  public displayedColumns: string[] = [
    'country',
    'region',
    'locality',
    'name',
    'size',
    'website',
  ];

  constructor(private readonly companiesService: CompaniesService) {}

  ngOnInit(): void {
    this.loadCompanies();
  }

  onPageChange(event: PageEvent) {
    this.loadCompanies(event.pageIndex);
  }

  async loadCompanies(pageIndex: number = 0) {
    this.companies = [];
    this.loading = true;
    this.error = false;

    try {
      const page = pageIndex + 1;
      this.companies = await this.companiesService.getCompanies({
        database: this.filters.database ?? 'us',
        size: this.filters.size ?? '11-50',
        industry: this.filters.industry ?? 'computer software',
        locality: this.filters.locality ?? 'san francisco',
        region: this.filters.region ?? 'california',
        country: this.filters.country ?? 'united states',
        page,
      });
    } catch (err) {
      console.error(err);
      this.error = true;
    }

    this.loading = false;
  }
}
