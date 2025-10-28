import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ProductsService {

  private readonly url: string = 'http://localhost:3000';

  private readonly http = inject(HttpClient);

  public listAll(): Observable<any> {
    return this.http.get(`${this.url}/produtos`);
  }

}
