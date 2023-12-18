import { Component, OnInit, ViewChild } from '@angular/core';
import { ProductWithCategory, product } from './product.model';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { HttpService } from '../http.service';
import { Observable, forkJoin } from 'rxjs';
import { map } from 'rxjs/operators';
import { Category } from '../category-list/category.model';

@Component({
  selector: 'app-product-list',
  templateUrl: './product-list.component.html',
  styleUrls: ['./product-list.component.css']
})
export class ProductListComponent implements OnInit {

  product: product[];
  categories: Category[];
  productsWithCategories: any[];
  displayColumn: string[] = ['id', 'name', 'category_name', 'price'];
  pagesize = 5;
  currentpage = 0;
  length = 0;
  offset = 0;

  url = 'http://localhost:3000/product';
  urlcat = 'http://localhost:3000/category'

  data: MatTableDataSource<product>;

  @ViewChild(MatPaginator) paginator: MatPaginator;

  constructor(private http: HttpService) { }

  ngOnInit(): void {
    this.http.getProductsAndCategories().subscribe((data) => {
      this.productsWithCategories = data;
      console.log(this.productsWithCategories);
    });
  }

  getLength(url: string): Observable<number> {
    return this.http.getRequest(url).pipe(
      map((response: any) => response.length)
    );
  }

  pageChage(event): void {
    this.offset = event.pageIndex * this.pagesize;
    this.currentpage = event.pageIndex;
    this.paginator = event.pageSize;
  }
}
