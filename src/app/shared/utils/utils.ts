import { Vendas } from "../enums/vendas.enum";

export class Utils {

  public handleEnumToOptions(): any[] {
    const vendas = Vendas;
    return Object.values(vendas).map((venda) => ({ name: venda, value: venda }));
  }

}
