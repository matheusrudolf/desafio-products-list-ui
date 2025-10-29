import { Component, inject, signal } from '@angular/core';
import {
  PoMenuItem,
  PoMenuModule,
  PoPageModule,
  PoHeaderModule,
  PoHeaderBrand,
  PoBreadcrumb,
} from '@po-ui/ng-components';
import { NavigationEnd, Router, RouterModule } from "@angular/router";
import { filter } from 'rxjs';

@Component({
  standalone: true,
  selector: 'app-main-layout',
  imports: [
    PoMenuModule,
    PoPageModule,
    RouterModule,
    PoHeaderModule
  ],
  template: `
    <po-header [p-brand]="headerBrand"></po-header>
    <div class="po-wrapper">

      <po-menu [p-menus]="menus"></po-menu>

      <po-page-default [p-breadcrumb]="breadcrumb">
        <router-outlet />
      </po-page-default>
    </div>
  `,
})
export class MainLayout {
  private readonly router = inject(Router);
  public breadcrumb!: PoBreadcrumb;

  constructor() {
    this.router.events
      .pipe(filter(event => event instanceof NavigationEnd))
      .subscribe((event: NavigationEnd) => {
        this.breadcrumb = {
          items: [{ label: this.formatUrlToTitle(event.urlAfterRedirects), link: event.urlAfterRedirects }]
        };
      });
  }

  public headerBrand: PoHeaderBrand = {
    title: 'Web Shop',
    logo: '/po_color.png',
    action: () => this.router.navigate([''])
  };

  public readonly menus: Array<PoMenuItem> = [
    { label: 'Home', action: () => this.router.navigate(['']) },
    { label: 'Produtos', action: () => this.router.navigate(['/produtos']) },
  ];

  private formatUrlToTitle(url: string): string {
    const clean = url.replace('/', '');
    if (!clean) return 'Home';

    return clean.split('-')
      .map(word => word.charAt(0).toUpperCase() + word.slice(1))
      .join(' ');
  }
}
