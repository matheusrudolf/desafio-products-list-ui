import { Component, inject, OnInit, viewChild } from '@angular/core';
import { ProductsService } from '../../core/products.service';
import { PoModalComponent, PoModalModule, PoWidgetModule, PoFieldModule, PoLoadingModule } from '@po-ui/ng-components';
import { DecimalPipe, registerLocaleData } from '@angular/common';
import ptBr from '@angular/common/locales/pt';
import { FormsModule } from '@angular/forms';

@Component({
  standalone: true,
  selector: 'app-home',
  imports: [PoWidgetModule, DecimalPipe, PoModalModule, PoFieldModule, FormsModule, PoLoadingModule],
  template: `
    <div style="display: flex; flex-wrap: wrap; gap: 1rem; justify-content: flex-start;">
      @if (products.length === 0) {
        <po-loading-overlay p-size="lg"></po-loading-overlay>
      }
      @for (product of products; track $index) {
        <po-widget
          [p-title]="product.titulo"
          p-tag="Vendas"
          [p-tag-icon]="product.vendas === 'baixo' ? 'an an-arrow-circle-down' : 'an an-arrow-circle-up'"
          [p-tag-type]="product.vendas === 'alto' ? 'success' : product.vendas === 'medio' ? 'warning' : 'danger'"
          p-primary-label="Detalhes"
          p-secondary-label="Comprar"
          (p-primary-action)="openDetails(product)"
          [p-height]="395"
          style="flex: 1 1 200px; max-width: 100%;">
          <img [src]="product.img" [alt]="product.titulo" width="250rem" style="display: block; margin: 0 auto; border-radius: .5rem;">
          <div style="margin-top: 1rem;">
            <div class="po-font-subtitle po-text-center">R$ {{ product.preco | number : '1.2-2' : 'pt-BR' }} </div>
            <div class="po-text-center"> {{ product.descricao }} </div>
          </div>
        </po-widget>
      }
    </div>

    <po-modal #modal p-title="Produto">
        @if (product) {
          <div style="margin-bottom: 1rem;">
            <h2 class="po-text-center"> {{ product.titulo }} </h2>
            <h5 class="po-text-center"> {{ product.descricao }} </h5>
          </div>
          <img [src]="product.img" [alt]="product.titulo" width="350rem" style="display: block; margin: 0 auto; border-radius: .5rem;">
          <div style="margin-top: 1rem;">
            <po-textarea
              [(ngModel)]="product.detalhe"
              [p-readonly]="true">
            </po-textarea>
          </div>
        }
      </po-modal>
  `,
})
export class HomeComponent implements OnInit {
  private readonly productsService = inject(ProductsService);

  private readonly productDetail = viewChild<PoModalComponent>('modal');

  public products: any[] = [];
  public product!: any;

  constructor() {
    registerLocaleData(ptBr);
  }

  ngOnInit(): void {
    this.handleProductsListAll();
  }

  private handleProductsListAll(): void {
    this.productsService.listAll().subscribe({
      next: (res) => setTimeout(() => this.products = res, 1000),
      error: (error) => console.error(error)
    });
  }

  public openDetails(product: any): void {
    this.product = product;
    this.productDetail()?.open();
  }

}
