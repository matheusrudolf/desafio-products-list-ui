
import { Component } from '@angular/core';
import { MainLayout } from './layout/main-layout/main-layout';
import { registerLocaleData } from '@angular/common';
import ptBr from '@angular/common/locales/pt';

@Component({
  selector: 'app-root',
  imports: [MainLayout],
  template: `
    <app-main-layout />
  `
})
export class App {

  constructor() {
    registerLocaleData(ptBr);
  }
}
