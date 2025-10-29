import { HttpClient, HttpParams } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ProductsService {

  private readonly url: string = 'http://localhost:3000';

  private readonly http = inject(HttpClient);

  public listAll(filter?: string): Observable<any> {
    let params = new HttpParams();

    if (filter?.trim()) {
      params = params.set('q', filter.trim());
    }

    return this.http.get(`${this.url}/produtos`, { params });
  }

}
