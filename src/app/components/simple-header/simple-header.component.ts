import { Component, Input } from '@angular/core';
import { MatToolbarModule } from '@angular/material/toolbar';

@Component({
  selector: 'app-simple-header',
  imports: [MatToolbarModule],
  templateUrl: './simple-header.component.html',
  styleUrl: './simple-header.component.scss',
})
export class SimpleHeaderComponent {
  @Input() title!: string;
}
