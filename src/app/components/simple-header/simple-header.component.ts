import { Component, EventEmitter, Input, Output } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatToolbarModule } from '@angular/material/toolbar';

@Component({
  selector: 'app-simple-header',
  imports: [MatToolbarModule, MatButtonModule, MatIconModule],
  templateUrl: './simple-header.component.html',
  styleUrl: './simple-header.component.scss',
})
export class SimpleHeaderComponent {
  @Input() title!: string;
  @Input() icon!: string;
  @Output() handler = new EventEmitter<void>();

  onClick() {
    this.handler.emit();
  }
}
