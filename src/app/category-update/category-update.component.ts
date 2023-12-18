import { Component, OnInit } from '@angular/core';
import { Category } from '../category-list/category.model';
import { ActivatedRoute, Router } from '@angular/router';
import { HttpService } from '../http.service';

@Component({
  selector: 'app-category-update',
  templateUrl: './category-update.component.html',
  styleUrls: ['./category-update.component.css']
})
export class CategoryUpdateComponent implements OnInit {

  category: Category;
  valid = false;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private http: HttpService
  ) { }

  ngOnInit(): void {
    this.getCategoryID();
  }

  getCategoryID(): void {
    const id = +this.route.snapshot.paramMap.get('id');
    this.http.getByID('http://localhost:3000/category', id).subscribe(
      category => {
        this.category = category;
      },
      error => {
        console.error('error', error);
      }
    );
  }

  updateCategory(): void {
    if (!this.category.category_name) {
      this.valid = true;
    } else {
      this.valid = false;

      this.http.updateRequest('http://localhost:3000/category', this.category).subscribe(
        () => {
          this.router.navigate(['category/list']);
        },
        error => {
          console.error('error update', error);
        }
      );
    }
  }
}
