import { Component, inject, signal } from '@angular/core';
import {
  PoMenuItem,
  PoMenuModule,
  PoPageModule,
  PoToolbarModule,
  PoHeaderModule,
  PoHeaderBrand
} from '@po-ui/ng-components';
import { NavigationEnd, Router, RouterModule } from "@angular/router";

@Component({
  standalone: true,
  selector: 'app-main-layout',
  imports: [
    PoToolbarModule,
    PoMenuModule,
    PoPageModule,
    RouterModule,
    PoHeaderModule
  ],
  template: `
    <po-header [p-brand]="headerBrand"></po-header>
    <div class="po-wrapper">
      <po-toolbar p-title="Web Products"></po-toolbar>

      <po-menu [p-menus]="menus"></po-menu>

      <po-page-default [p-title]="navTitle()">
        <router-outlet />
      </po-page-default>
    </div>
  `,
})
export class MainLayout {
  private router = inject(Router);

  public headerBrand: PoHeaderBrand = {
    title: 'Web Products',
    logo: '/po_color.png'
  };

  public readonly menus: Array<PoMenuItem> = [
    { label: 'Home', action: this.handleCallHome.bind(this) },
    { label: 'Produtos', action: this.handleCallProducts.bind(this) },
  ];

  public navTitle = signal<string>('');

  constructor() {
    this.router.events.subscribe(event => {
      if (event instanceof NavigationEnd) {
        this.navTitle.set(this.handleNavTitle(event.urlAfterRedirects));
      }
    });
  }

  private handleCallHome() {
    this.router.navigate(['']);
  }

  private handleCallProducts() {
    this.router.navigate(['/produtos']);
  }

  private handleNavTitle(url: string): string {
    const clearString = url.replace('/', '');
    if (!clearString) return 'Home';

    return clearString.split('-')
      .map(word => word.charAt(0).toUpperCase() + word.slice(1)).join(' ');
  }
}
