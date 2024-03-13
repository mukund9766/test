import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-category-master',
  standalone: true,
  imports: [],
  templateUrl: './category-master.component.html',
  styleUrl: './category-master.component.css'
})
export class CategoryMasterComponent implements OnInit {
  categories: any[] = [];
  newCategoryName: string = '';

  constructor(private http: HttpClient) { }

  ngOnInit(): void {
    this.fetchCategories();
  }

  fetchCategories() {
    this.http.get<any[]>('http://localhost:3000/categories')
      .subscribe(categories => {
        this.categories = categories;
      });
  }

  addCategory() {
    this.http.post<any>('http://localhost:3000/categories', { CategoryName: this.newCategoryName })
      .subscribe(() => {
        this.fetchCategories();
        this.newCategoryName = '';
      });
  }
}
