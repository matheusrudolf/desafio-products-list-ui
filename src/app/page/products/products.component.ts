import { ProductsService } from './../../core/products.service';
import { Component, inject, OnInit, signal } from '@angular/core';
import { PoTableColumn, PoTableModule, PoButtonModule, PoTooltipModule, PoModalModule, PoDialogService, PoNotificationService } from '@po-ui/ng-components';
import { ProductsFormComponent } from './components/products-form/products-form.component';
import { IProducts } from '../../shared/models/products';

@Component({
  standalone: true,
  selector: 'app-products',
  imports: [PoTableModule, PoButtonModule, PoTooltipModule, PoModalModule, ProductsFormComponent],
  template: `
    <div class="flex content-between po-mb-2 po-mt-2">
      <div>
        <h3>Lista de Produtos</h3>
        <h5>Cadastro seu produto</h5>
      </div>

      <po-button
        p-label="Adicionar Produto"
        p-icon="an an-plus"
        (p-click)="onAddRow()">
      </po-button>
    </div>

    <po-table
      [p-items]="products"
      [p-columns]="columns"
      [p-loading]="products.length === 0"
      [p-hide-columns-manager]="true"
      [p-striped]="true"
      [p-sort]="true"
      [p-hide-table-search]="false"
      p-container="shadow">
      <ng-template p-table-cell-template let-column="column" let-row="row">
        <po-button
          p-icon="an an-pencil"
          p-kind="tertiary"
          p-tooltip="Editar"
          (p-click)="onEditRow(row)">
        </po-button>
        <po-button
          p-icon="an an-trash"
          p-kind="tertiary"
          p-tooltip="Remover"
          (p-click)="onDeleteRow(row)">
        </po-button>
      </ng-template>
    </po-table>

    <app-products-form
      [visible]="modalVisible"
      [modalTitle]="modalTitle()"
      [product]="product"
      (onClose)="modalVisible = !modalVisible; product = null" />
  `,
})
export class ProductsComponent implements OnInit {
  private readonly productsService = inject(ProductsService);
  private readonly poAlert = inject(PoDialogService);
  private readonly poNotification = inject(PoNotificationService);

  public products: IProducts[] = [];
  public product!: IProducts;
  public modalVisible: boolean = false;

  public columns: PoTableColumn[] = [
    { property: 'titulo', label: 'Títiulo' },
    { property: 'preco', label: 'Preço', type: 'currency', format: 'BRL' },
    { property: 'descricao', label: 'Descrição' },
    { property: 'acoes', label: 'Ações', type: 'cellTemplate' },
  ];

  public modalTitle = signal<string>('');

  ngOnInit(): void {
    this.handleProductsListAll();
  }

  private handleProductsListAll(): void {
    this.productsService.listAll().subscribe({
      next: (res) => setTimeout(() => this.products = res, 1000),
      error: (error) => console.error(error)
    });
  }

  public onAddRow(): void {
    this.modalTitle.update(() => 'Adicionar');
    this.modalVisible = !this.modalVisible;
  }

  public onEditRow(value: IProducts): void {
    this.product = value;
    this.modalTitle.update(() => 'Editar');
    this.modalVisible = !this.modalVisible;
  }

  public onDeleteRow(value: IProducts): void {
    this.poAlert.confirm({
      literals: { confirm: 'Sim', cancel: 'Não' },
      title: 'Confirmar Remoção',
      message: `Deseja remover o produto ${value.titulo}?`,
      confirm: () => {
        this.product = value;

        this.productsService.deleteProduct(this.product).subscribe({
          next: () => this.poNotification.success('Produto removido com sucesso!'),
          error: (error) => console.error(error)
        });
      }
    })
  }

}
