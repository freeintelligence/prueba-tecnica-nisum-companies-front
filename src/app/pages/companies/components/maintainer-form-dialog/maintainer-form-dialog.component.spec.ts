import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MaintainerFormDialogComponent } from './maintainer-form-dialog.component';

describe('MaintainerFormDialogComponent', () => {
  let component: MaintainerFormDialogComponent;
  let fixture: ComponentFixture<MaintainerFormDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [MaintainerFormDialogComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MaintainerFormDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
