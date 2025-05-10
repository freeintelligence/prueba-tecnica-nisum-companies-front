import {
  ChangeDetectorRef,
  Component,
  EventEmitter,
  Output,
} from '@angular/core';
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
import { MatIconModule } from '@angular/material/icon';

@Component({
  selector: 'app-companies-table',
  imports: [
    MatPaginatorModule,
    MatTableModule,
    NgIf,
    MatProgressSpinnerModule,
    MatButtonModule,
    MatIconModule,
  ],
  templateUrl: './table.component.html',
  styleUrl: './table.component.scss',
  providers: [{ provide: MatPaginatorIntl, useClass: CustomPaginatorIntl }],
})
export class TableComponent {
  @Output() edit: EventEmitter<Company> = new EventEmitter<Company>();

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
    'options',
  ];

  constructor(
    private readonly companiesService: CompaniesService,
    private readonly changeDetectorRef: ChangeDetectorRef
  ) {}

  ngOnInit(): void {
    this.loadCompanies();
  }

  onPageChange(event: PageEvent) {
    this.loadCompanies(event.pageIndex);
  }

  async add(company: Company) {
    this.companies = [company, ...this.companies];
    this.changeDetectorRef.detectChanges();
  }

  async onEdit(company: Company) {
    this.edit.emit(company);
  }

  async update(companyInternalId: string, company: Company) {
    this.companies = this.companies.map((c) =>
      c.internalId === companyInternalId ? company : c
    );
  }

  async delete(company: Company) {
    this.companies = this.companies.filter(
      (c) => c.internalId !== company.internalId
    );
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
