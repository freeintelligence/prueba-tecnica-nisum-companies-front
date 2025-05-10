import { Component } from '@angular/core';
import { MainContainerComponent } from '../../components/main-container/main-container.component';
import { SimpleHeaderComponent } from '../../components/simple-header/simple-header.component';
import { TableComponent } from './components/table/table.component';

@Component({
  selector: 'app-companies',
  imports: [MainContainerComponent, SimpleHeaderComponent, TableComponent],
  templateUrl: './companies.component.html',
  styleUrl: './companies.component.scss',
})
export class CompaniesComponent {
  constructor() {}
}
