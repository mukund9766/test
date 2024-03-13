// product-master.component.ts
import { Component, OnInit } from '@angular/core';
import { ProductService } from '../product.service';

@Component({
  selector: 'app-product-master',
  templateUrl: './product-master.component.html',
  styleUrls: ['./product-master.component.css']
})
export class ProductMasterComponent implements OnInit {
  products: any[] = [];
  displayedProducts: any[] = [];
  currentPage: number = 1;
  pageSize: number = 10;
  totalPages: number = 0;
  newProductName: string = '';
  selectedCategoryId: number = 0;

  constructor(private productService: ProductService) { }

  ngOnInit(): void {
    this.fetchProducts();
  }

  fetchProducts() {
    this.productService.getAllProducts(this.currentPage, this.pageSize)
      .subscribe(products => {
        this.products = products;
        this.updateDisplayedProducts();
      });
  }

  updateDisplayedProducts() {
    const startIndex = (this.currentPage - 1) * this.pageSize;
    this.displayedProducts = this.products.slice(startIndex, startIndex + this.pageSize);
    this.calculateTotalPages();
  }

  calculateTotalPages() {
    this.totalPages = Math.ceil(this.products.length / this.pageSize);
  }

  prevPage() {
    if (this.currentPage > 1) {
      this.currentPage--;
      this.updateDisplayedProducts();
    }
  }

  nextPage() {
    if (this.currentPage < this.totalPages) {
      this.currentPage++;
      this.updateDisplayedProducts();
    }
  }

  addProduct() {
    const productData = {
      ProductName: this.newProductName,
      CategoryId: this.selectedCategoryId
    };
    this.productService.addProduct(productData)
      .subscribe(() => {
        this.fetchProducts();
        this.newProductName = '';
        this.selectedCategoryId = 0;
      });
  }
}
