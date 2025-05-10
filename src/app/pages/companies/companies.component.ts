import { Component, ViewChild } from '@angular/core';
import { MainContainerComponent } from '../../components/main-container/main-container.component';
import { SimpleHeaderComponent } from '../../components/simple-header/simple-header.component';
import { TableComponent } from './components/table/table.component';
import { Company } from '../../models/company.model';
import { MatDialog, MatDialogModule } from '@angular/material/dialog';
import {
  MaintainerFormDialogComponent,
  MaintainerFormDialogData,
} from './components/maintainer-form-dialog/maintainer-form-dialog.component';
import { MatSnackBar, MatSnackBarModule } from '@angular/material/snack-bar';

@Component({
  selector: 'app-companies',
  imports: [
    MainContainerComponent,
    SimpleHeaderComponent,
    TableComponent,
    MatDialogModule,
    MatSnackBarModule,
  ],
  templateUrl: './companies.component.html',
  styleUrl: './companies.component.scss',
})
export class CompaniesComponent {
  @ViewChild(TableComponent) table!: TableComponent;

  constructor(
    private readonly dialog: MatDialog,
    private readonly snackBar: MatSnackBar
  ) {}

  onEdit(company: Company) {
    const dialogRef = this.dialog.open<
      MaintainerFormDialogComponent,
      MaintainerFormDialogData
    >(MaintainerFormDialogComponent, {
      width: '512px',
      data: {
        title: `Editar empresa`,
        company,
      },
    });

    dialogRef.afterClosed().subscribe((newCompany?: Company) => {
      if (newCompany) {
        this.table.update(company.internalId, newCompany);

        this.snackBar.open(
          `La empresa ${company.name} ha sido actualizada!`,
          `Cerrar`,
          { duration: 3000 }
        );
      }
    });
  }

  onCreate() {
    const company = new Company({
      country: '',
      industry: '',
      linkedInUrl: '',
      locality: '',
      name: '',
      region: '',
      size: '',
      website: '',
    });

    const dialogRef = this.dialog.open<
      MaintainerFormDialogComponent,
      MaintainerFormDialogData
    >(MaintainerFormDialogComponent, {
      width: '512px',
      data: {
        title: `Crear empresa`,
        company,
      },
    });

    dialogRef.afterClosed().subscribe((newCompany?: Company) => {
      if (newCompany) {
        this.table.add(newCompany);

        this.snackBar.open(
          `La empresa ${newCompany.name} ha sido creada exitosamente!`,
          `Cerrar`,
          { duration: 3000 }
        );
      }
    });
  }
}
