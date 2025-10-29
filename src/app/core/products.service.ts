import { HttpClient, HttpParams } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { IProducts } from '../shared/models/products';

@Injectable({
  providedIn: 'root'
})
export class ProductsService {

  private readonly url: string = 'http://localhost:3000';

  private readonly http = inject(HttpClient);

  public listAll(filter?: string): Observable<IProducts[]> {
    let params = new HttpParams();

    if (filter?.trim()) {
      params = params.set('q', filter.trim());
    }

    return this.http.get<IProducts[]>(`${this.url}/produtos`, { params });
  }

  public insertProduct(data: IProducts): Observable<IProducts> {
    return this.http.post<IProducts>(`${this.url}/produtos`, data);
  }

  public updateProduct(data: IProducts): Observable<IProducts> {
    return this.http.put<IProducts>(`${this.url}/produtos/${data.id}`, data);
  }

  public deleteProduct(data: IProducts): Observable<IProducts> {
    return this.http.delete<IProducts>(`${this.url}/produtos/${data.id}`);
  }

}
