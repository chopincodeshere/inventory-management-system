import { Component } from '@angular/core';
import { PrimeNGConfig } from 'primeng/api';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent {
  title = 'ims-frontend';

  constructor(private config: PrimeNGConfig) {}

  ngOnInit() {
    this.config.ripple = true;
  }
}
