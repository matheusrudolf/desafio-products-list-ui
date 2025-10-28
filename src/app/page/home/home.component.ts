import { Component, inject, OnInit } from '@angular/core';
import { ProductsService } from '../../core/products.service';

@Component({
  standalone: true,
  selector: 'app-home',
  imports: [],
  template: `
    @for (product of products; track $index) {
      <p> {{ product.titulo }} </p>
    }
  `,
})
export class HomeComponent implements OnInit {

  private readonly productsService = inject(ProductsService);
  public products: any[] = [];

  ngOnInit(): void {
    this.handleProductsListAll();
  }

  private handleProductsListAll(): void {
    this.productsService.listAll().subscribe({
      next: (res) => this.products = res,
      error: (error) => console.error(error)
    });
  }

}
