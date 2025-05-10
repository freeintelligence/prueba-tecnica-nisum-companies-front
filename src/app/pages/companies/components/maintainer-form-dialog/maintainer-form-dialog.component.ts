import { Component, inject } from '@angular/core';
import {
  FormControl,
  FormGroup,
  FormsModule,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import {
  MAT_DIALOG_DATA,
  MatDialogActions,
  MatDialogContent,
  MatDialogRef,
  MatDialogTitle,
} from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { Company } from '../../../../models/company.model';
import { NgIf } from '@angular/common';

export interface MaintainerFormDialogData {
  title: string;
  company: Company;
}

@Component({
  selector: 'app-maintainer-form-dialog',
  imports: [
    MatFormFieldModule,
    MatInputModule,
    FormsModule,
    ReactiveFormsModule,
    MatButtonModule,
    MatDialogTitle,
    MatDialogContent,
    MatDialogActions,
    NgIf,
  ],
  templateUrl: './maintainer-form-dialog.component.html',
  styleUrl: './maintainer-form-dialog.component.scss',
})
export class MaintainerFormDialogComponent {
  readonly dialogRef = inject(MatDialogRef<MaintainerFormDialogComponent>);
  readonly data = inject<MaintainerFormDialogData>(MAT_DIALOG_DATA);

  form: FormGroup = new FormGroup({
    country: new FormControl(this.data.company.country, [Validators.required]),
    region: new FormControl(this.data.company.region, [
      Validators.required,
      Validators.maxLength(50),
    ]),
    locality: new FormControl(this.data.company.locality, [
      Validators.required,
    ]),
    name: new FormControl(this.data.company.name, [
      Validators.required,
      Validators.minLength(3),
      Validators.maxLength(64),
    ]),
    industry: new FormControl(this.data.company.industry, [
      Validators.required,
    ]),
    size: new FormControl(this.data.company.size, [
      Validators.required,
      Validators.minLength(3),
      Validators.maxLength(10),
    ]),
    linkedInUrl: new FormControl(this.data.company.linkedInUrl, [
      Validators.required,
      Validators.pattern('linkedin.com/company/.*'),
    ]),
    website: new FormControl(this.data.company.website, [Validators.required]),
  });

  async submit() {
    if (!this.form.valid) {
      return;
    }

    const newCompany: Company = new Company({
      country: this.form.get('country')?.value,
      industry: this.form.get('industry')?.value,
      linkedInUrl: this.form.get('linkedInUrl')?.value,
      locality: this.form.get('locality')?.value,
      name: this.form.get('name')?.value,
      region: this.form.get('region')?.value,
      size: this.form.get('size')?.value,
      website: this.form.get('website')?.value,
    });

    return this.dialogRef.close(newCompany);
  }

  cancel() {
    this.dialogRef.close();
  }
}
