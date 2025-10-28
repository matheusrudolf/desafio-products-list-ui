import { Component, inject } from '@angular/core';
import {
  PoMenuItem,
  PoMenuModule,
  PoPageModule,
  PoHeaderModule,
  PoHeaderBrand,
} from '@po-ui/ng-components';
import { Router, RouterModule } from "@angular/router";

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

      <po-page-default>
        <router-outlet />
      </po-page-default>
    </div>
  `,
})
export class MainLayout {
  private readonly router = inject(Router);

  public headerBrand: PoHeaderBrand = {
    title: 'Web Products',
    logo: '/po_color.png',
    action: () => this.router.navigate([''])
  };

  public readonly menus: Array<PoMenuItem> = [
    { label: 'Home', action: () => this.router.navigate(['']) },
    { label: 'Produtos', action: () => this.router.navigate(['/produtos']) },
  ];
}
