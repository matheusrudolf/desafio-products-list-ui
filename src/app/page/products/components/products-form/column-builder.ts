import { PoDynamicFormField } from "@po-ui/ng-components";
import { Utils } from "../../../../shared/utils/utils";

export class ColumnBuilder {

  private util = new Utils;

  public generateColumnProducts(): PoDynamicFormField[] {
    return [
      {
        property: 'titulo',
        label: 'Título',
        type: 'string',
        required: true,
        gridColumns: 10,
        gridSmColumns: 12,
        order: 1,
        placeholder: 'Digite o título do produto...'
      },
      {
        property: 'preco',
        label: 'Preço',
        type: 'currency',
        locale: 'br',
        required: true,
        gridColumns: 2,
        gridSmColumns: 12,
        order: 2,
        placeholder: '0,00'
      },
      {
        property: 'vendas',
        type: 'string',
        required: true,
        gridColumns: 4,
        gridSmColumns: 12,
        order: 3,
        options: this.util.handleEnumToOptions(),
        placeholder: 'Selecione uma opção...',
        fieldLabel: 'name',
        fieldValue: 'value'
      },
      {
        property: 'img',
        label: 'Imagem',
        required: true,
        gridColumns: 8,
        gridSmColumns: 12,
        order: 4,
        placeholder: 'Insira a URL da imagem aqui...'
      },
      {
        property: 'descricao',
        label: 'Descrição',
        required: true,
        gridColumns: 12,
        gridSmColumns: 12,
        order: 5,
        placeholder: 'Digite a descrição do produto...'
      },
      {
        property: 'detalhe',
        required: true,
        gridColumns: 12,
        gridSmColumns: 12,
        order: 6,
        rows: 5,
        placeholder: 'Descreva detalhadamente o produto...'
      }
    ];
  }
}
