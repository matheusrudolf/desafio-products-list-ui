import { Component, EventEmitter, inject, Input, OnChanges, Output, SimpleChanges, viewChild } from '@angular/core';
import { PoModalModule, PoButtonModule, PoDynamicFormField, PoDynamicModule, PoModalComponent, PoNotificationService } from '@po-ui/ng-components';
import { IProducts } from '../../../../shared/models/products';
import { ProductsService } from '../../../../core/products.service';
import { ColumnBuilder } from './column-builder';

@Component({
  standalone: true,
  selector: 'app-products-form',
  imports: [PoModalModule, PoButtonModule, PoDynamicModule],
  template: `
    <po-modal #modal
      [p-title]="modalTitle"
      [p-hide-close]="true">
      <po-dynamic-form
        #dynamicForms
        [p-fields]="fields"
        [p-value]="product">
      </po-dynamic-form>

      <po-modal-footer>
        <po-button
           p-label="Confirmar"
          [p-disabled]="dynamicForms?.form.invalid"
          (p-click)="onConfirmation()">
        </po-button>
        <po-button
          p-label="Fechar"
          (p-click)="handleOnClose(modal)">
        </po-button>
      </po-modal-footer>
    </po-modal>
  `
})
export class ProductsFormComponent implements OnChanges {
  private readonly productsService = inject(ProductsService);
  private readonly poNotification = inject(PoNotificationService);

  private modal = viewChild<PoModalComponent>('modal');

  private columnBuilder = new ColumnBuilder;

  private formState: boolean = false;

  @Input() visible: boolean;
  @Input() modalTitle: string;
  @Input() product: IProducts;

  @Output() onClose: EventEmitter<boolean> = new EventEmitter<boolean>();

  public fields: PoDynamicFormField[] = this.columnBuilder.generateColumnProducts();

  ngOnChanges(_changes: SimpleChanges): void {
    if (this.visible) this.modal().open();
    if (!this.product) this.product = {};
    this.formState = this.modalTitle === 'Adicionar';
  }

  public onConfirmation(): void {
    const request = this.formState ? 'insertProduct' : 'updateProduct';
    const msgStatus = this.formState ? 'cadastrado' : 'alterado';

    this.productsService[request](this.product).subscribe({
      next: () => this.poNotification.success(`Produto ${msgStatus} com sucesso!`),
      error: (error) => console.error(error)
    });
  }

  public handleOnClose(modal: PoModalComponent): void {
    modal.close();
    this.onClose.emit(false);
  }
}
