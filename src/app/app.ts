
import { Component } from '@angular/core';
import { MainLayout } from './layout/main-layout/main-layout';

@Component({
  selector: 'app-root',
  imports: [MainLayout],
  template: `<app-main-layout />`
})
export class App { }
