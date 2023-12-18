import { HttpClient, HttpParams, HttpHeaders, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, forkJoin, throwError } from 'rxjs';
import { catchError, map } from 'rxjs/operators';
import { Category } from './category-list/category.model';


@Injectable({
  providedIn: 'root'
})
export class HttpService {

  constructor(
    private http: HttpClient
  ) { }

  getProductsAndCategories(): Observable<any> {
    return forkJoin([this.getRequest('http://localhost:3000/category'),
    this.getRequest('http://localhost:3000/product')]).pipe(
      map(([category, product]) =>
        product.map((product) => ({
          ...product,
          category_name: category.find((c) => c.id === product.category_id)?.category_name || 'Uncategorized',
        }))
      )
    );
  }

  getRequest1(url: string): void {
    this.http.get(url).subscribe((response => {
      console.log(response)
    }))
  }

  getByID(url: string, id: number): Observable<any> {
    return this.http.get<any>(`${url}/${id}`)
  }

  getRequest(url: string): Observable<any> {
    return this.http.get(url)
      .pipe(
        catchError(this.handleError)
      )
  }

  postRequest(url: string, data: any, option?: any): Observable<any> {
    return this.http.post(url, data, option)
      .pipe(
        catchError(this.handleError)
      )
  }

  updateRequest(url: string, category: Category): Observable<any> {
    return this.http.put<any>(`${url}/${category.id}`, category)
  }

  handleError(error: HttpErrorResponse) {
    if (error.error instanceof ErrorEvent) {
      console.error('An Error occurred: ', error.error.message);
    } else {
      console.error(
        `Backend return code ${error.status}` +
        `body was: ${error.error}`
      );
    }

    return throwError(
      'Something bad happend; please try again later.'
    )
  }

  deleteProduct(apiUrl: string, id: number): Observable<any> {
    return this.http.delete<any>(`${apiUrl}/${id}`);
  }
}

