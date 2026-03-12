import { Component, OnInit, inject } from '@angular/core';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ProductService } from '../../services/product.service';
import { CartService } from '../../services/cart.service';
import { Product } from '../../models/product.model';

@Component({
    selector: 'app-product-list',
    imports: [RouterLink, CommonModule, FormsModule],
    templateUrl: './product-list.component.html',
    styleUrl: './product-list.component.scss'
})
export class ProductListComponent implements OnInit {
  private productService = inject(ProductService);
  private cartService = inject(CartService);
  private route = inject(ActivatedRoute);

  allProducts: Product[] = [];
  filteredProducts: Product[] = [];
  categories: string[] = [];
  selectedCategory = 'All';
  sortBy = 'default';
  searchQuery = '';
  loading = true;

  ngOnInit(): void {
    this.productService.getProducts().subscribe(products => {
      this.allProducts = products;
      this.loading = false;
    });

    this.productService.getCategories().subscribe(cats => {
      this.categories = ['All', ...cats];
    });

    this.route.queryParams.subscribe(params => {
      if (params['category']) {
        this.selectedCategory = params['category'];
      }
      if (params['search']) {
        this.searchQuery = params['search'];
      }
      this.applyFilters();
    });
  }

  applyFilters(): void {
    let result = [...this.allProducts];

    if (this.selectedCategory && this.selectedCategory !== 'All') {
      result = result.filter(p => p.category === this.selectedCategory);
    }

    if (this.searchQuery) {
      const query = this.searchQuery.toLowerCase();
      result = result.filter(p =>
        p.name.toLowerCase().includes(query) ||
        p.description.toLowerCase().includes(query) ||
        p.category.toLowerCase().includes(query)
      );
    }

    switch (this.sortBy) {
      case 'price-asc':
        result.sort((a, b) => a.price - b.price);
        break;
      case 'price-desc':
        result.sort((a, b) => b.price - a.price);
        break;
      case 'rating':
        result.sort((a, b) => b.rating - a.rating);
        break;
      case 'name':
        result.sort((a, b) => a.name.localeCompare(b.name));
        break;
    }

    this.filteredProducts = result;
  }

  onCategoryChange(category: string): void {
    this.selectedCategory = category;
    this.applyFilters();
  }

  onSortChange(): void {
    this.applyFilters();
  }

  onSearchChange(): void {
    this.applyFilters();
  }

  clearFilters(): void {
    this.selectedCategory = 'All';
    this.sortBy = 'default';
    this.searchQuery = '';
    this.applyFilters();
  }

  addToCart(product: Product, event: Event): void {
    event.preventDefault();
    event.stopPropagation();
    this.cartService.addToCart(product);
  }

  getStarArray(rating: number): number[] {
    return Array(5).fill(0).map((_, i) => i < Math.round(rating) ? 1 : 0);
  }
}
