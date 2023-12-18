import { Component, OnInit } from '@angular/core';
import { Category } from '../category-list/category.model';
import { HttpService } from '../http.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-category-create',
  templateUrl: './category-create.component.html',
  styleUrls: ['./category-create.component.css']
})
export class CategoryCreateComponent implements OnInit {

  addCategory: Category = {
    id: 0,
    category_name: "",
    description: ""
  }

  link = 'http://localhost:4200/category/create';
  binding = false;

  validname = false;

  constructor(private htpp: HttpService, private router: Router) { }

  ngOnInit(): void {
  }

  createCategory(): void {
    // if (this.addCategory.category_name == "") {
    //   this.validname = true;
    //   this.binding = false;
    // } else {
    //   this.binding = true;
    //   this.htpp.postRequest('http://localhost:3000/category', this.addCategory).subscribe(() => {

    //   })
    // }

    if (!this.addCategory.category_name) {
      this.validname = true;
      return;
    }

    this.htpp.postRequest('http://localhost:3000/category', this.addCategory).subscribe(
      (response) => {
        // Successfully created category, navigate to the category/list page
        this.router.navigate(['/category/list']);
      },
      (error) => {
        // Handle the error, you can also set validName to true or show an error message
        console.error('Error creating category:', error);
      }
    );
  }

}
