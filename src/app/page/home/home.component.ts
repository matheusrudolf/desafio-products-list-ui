import { Component, inject, OnInit, viewChild } from '@angular/core';
import { ProductsService } from '../../core/products.service';
import { PoModalComponent, PoModalModule, PoWidgetModule, PoFieldModule, PoLoadingModule, PoButtonModule } from '@po-ui/ng-components';
import { DecimalPipe } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  standalone: true,
  selector: 'app-home',
  imports: [PoWidgetModule, DecimalPipe, PoModalModule, PoFieldModule, FormsModule, PoLoadingModule, PoButtonModule],
  template: `
    <div class="po-mb-2">
      <h1 class="po-font-title">Produtos</h1>
      <h4 class="po-text-center">Confira nosso produtos disponíveis!</h4>
    </div>

    <div class="flex content-center">
      <po-input #search
        p-placeholder="Ou busque o seu produto aqui..."
        style="width: 100%;">
      </po-input>
      <po-button
        p-label="Buscar"
        p-size="medium"
        class="po-pt-1"
        (p-click)="handleProductsListAll(search.modelLastUpdate)">
      </po-button>
    </div>

    <div class="flex wrap content-flex-start">
      @if (loading) {
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
          [p-height]="400"
          class="card-detail">
          <img [src]="product.img" [alt]="product.titulo" width="250rem" class="block img-content">
          <div class="po-mt-2">
            <div class="po-font-subtitle po-text-center">R$ {{ product.preco | number : '1.2-2' : 'pt-BR' }} </div>
            <div class="po-text-center"> {{ product.descricao }} </div>
          </div>
        </po-widget>
      }
    </div>

    <po-modal #modal p-title="Produto">
        @if (product) {
          <div class="po-mb-2">
            <h2 class="po-text-center"> {{ product.titulo }} </h2>
            <h5 class="po-text-center"> {{ product.descricao }} </h5>
          </div>
          <img [src]="product.img" [alt]="product.titulo" width="350rem" class="block img-content">
          <div class="po-mt-2">
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
  public loading: boolean = false;

  ngOnInit(): void {
    this.handleProductsListAll();
  }

  public handleProductsListAll(param?: any): void {
    this.loading = true;

    this.productsService.listAll(param).subscribe({
      next: (res) => {
        setTimeout(() => {
          this.products = res;
          this.loading = false;
        }, 1000)
      },
      error: (error) => console.error(error)
    });
  }

  public openDetails(product: any): void {
    this.product = product;
    this.productDetail()?.open();
  }

}
