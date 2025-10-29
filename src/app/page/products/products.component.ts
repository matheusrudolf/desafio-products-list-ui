import { ProductsService } from './../../core/products.service';
import { Component, inject, OnInit } from '@angular/core';
import { PoTableColumn, PoTableModule, PoButtonModule, PoTooltipModule } from '@po-ui/ng-components';

@Component({
  standalone: true,
  selector: 'app-products',
  imports: [PoTableModule, PoButtonModule, PoTooltipModule],
  template: `
    <div style="display: flex; justify-content: space-between; margin-bottom: 1rem; margin-top: 1rem;">
      <h3>Lista de Produtos</h3>

      <po-button
        p-label="Adicionar Produto"
        p-icon="an an-plus">
      </po-button>
    </div>

    <po-table
      [p-items]="products"
      [p-columns]="columns"
      [p-loading]="products.length === 0"
      [p-hide-columns-manager]="true"
      [p-striped]="true">
      <ng-template p-table-cell-template let-column="column" let-row="row">
        <po-button
          p-icon="an an-pencil"
          p-kind="tertiary"
          p-tooltip="Editar"
          (p-click)="onClick(row)">
        </po-button>
        <po-button
          p-icon="an an-trash"
          p-kind="tertiary"
          p-tooltip="Remover">
        </po-button>
      </ng-template>
    </po-table>
  `,
})
export class ProductsComponent implements OnInit {
  private readonly productsService = inject(ProductsService);

  public products: any[] = [];

  public columns: PoTableColumn[] = [
    { property: 'titulo', label: 'Títiulo' },
    { property: 'preco', label: 'Preço', type: 'currency', format: 'BRL' },
    { property: 'descricao', label: 'Descrição' },
    { property: 'acoes', label: 'Ações', type: 'cellTemplate' },
  ];

  ngOnInit(): void {
    this.handleProductsListAll();
  }

  private handleProductsListAll(): void {
    this.productsService.listAll().subscribe({
      next: (res) => setTimeout(() => this.products = res, 1000),
      error: (error) => console.error(error)
    });
  }

  public onClick(value: any): void {
    console.log(value)
  }

}
