import { Component, OnInit, ViewChild } from '@angular/core';
import { Category } from './category.model';
import { HttpService } from '../http.service';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { Observable, forkJoin } from 'rxjs';
import { map } from 'rxjs/operators';

@Component({
  selector: 'app-category-list',
  templateUrl: './category-list.component.html',
  styleUrls: ['./category-list.component.css']
})
export class CategoryListComponent implements OnInit {

  category: Category[];
  displayedColumns: string[] = ['id', 'category_name', 'description', 'action'];
  pageSize = 5;
  currentPage = 0;
  length = 0;
  offset = 0;

  url = 'http://localhost:3000/product';

  dataSource: MatTableDataSource<Category>;

  @ViewChild(MatPaginator) paginator: MatPaginator;


  searchTerm: string = '';
  filteredCategories: Category[];

  constructor(private http: HttpService) { }

  ngOnInit(): void {

    this.loadCategory();

  }

  getTotalLength(url: string): Observable<number> {
    return this.http.getRequest(url).pipe(
      map((response: any) => response.length)
    );
  }

  onPageChange(event): void {
    this.offset = event.pageIndex * this.pageSize;
    this.currentPage = event.pageIndex;
    this.pageSize = event.pageSize;
    this.loadCategory();
  }

  loadCategory(): void {
    const apiEndpoint = `http://localhost:3000/category?_page=${this.currentPage + 1}&_limit=${this.pageSize}`;

    forkJoin([
      this.http.getRequest(apiEndpoint),
      this.getTotalLength('http://localhost:3000/category')
    ]).subscribe(([categoryResponse, totalLength]) => {
      this.category = categoryResponse;
      this.dataSource = new MatTableDataSource(this.category);
      this.length = totalLength;
      this.paginator.length = this.length;
    });
  }

  deleteCategory(id: number): void {
    this.http.deleteProduct('http://localhost:3000/category', id).subscribe(() => {
      this.ngOnInit();
    })
  }

  applyFilter(): void {
    this.filteredCategories = this.category.filter((category) =>
      this.matchesSearchTerm(category)
    );
  }

  matchesSearchTerm(category: Category): boolean {
    const searchTermLower = this.searchTerm.toLowerCase();
    return (
      category.category_name.toLowerCase().includes(searchTermLower)
      // category.description.toLowerCase().includes(searchTermLower)
    );
  }

}
