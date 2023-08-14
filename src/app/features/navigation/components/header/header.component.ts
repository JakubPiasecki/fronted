import { Component, ElementRef } from '@angular/core';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
})
export class HeaderComponent {
  title = 'CompetencyGrid';

  isOpen = false;

  constructor(private elRef: ElementRef) { }

  toggleContent() {
    this.isOpen = !this.isOpen;
  }

  hideContent() {
    this.isOpen = false;
  }

  onClick(event: Event) {
    if (!this.elRef.nativeElement.contains(event.target)) {
      this.hideContent();
    }
  }
}
