import { Component, OnInit, inject } from '@angular/core';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { CommonModule } from '@angular/common';
import { ProductService } from '../../services/product.service';
import { CartService } from '../../services/cart.service';
import { Product } from '../../models/product.model';

@Component({
    selector: 'app-product-detail',
    imports: [RouterLink, CommonModule],
    templateUrl: './product-detail.component.html',
    styleUrl: './product-detail.component.scss'
})
export class ProductDetailComponent implements OnInit {
  private route = inject(ActivatedRoute);
  private productService = inject(ProductService);
  private cartService = inject(CartService);

  product: Product | undefined;
  relatedProducts: Product[] = [];
  quantity = 1;
  addedToCart = false;
  loading = true;

  ngOnInit(): void {
    this.route.params.subscribe(params => {
      const id = Number(params['id']);
      this.loadProduct(id);
    });
  }

  loadProduct(id: number): void {
    this.loading = true;
    this.addedToCart = false;
    this.quantity = 1;

    this.productService.getProductById(id).subscribe(product => {
      this.product = product;
      this.loading = false;

      if (product) {
        this.productService.getProductsByCategory(product.category).subscribe(related => {
          this.relatedProducts = related.filter(p => p.id !== product.id).slice(0, 4);
        });
      }
    });
  }

  increaseQty(): void {
    this.quantity++;
  }

  decreaseQty(): void {
    if (this.quantity > 1) this.quantity--;
  }

  addToCart(): void {
    if (this.product && this.product.inStock) {
      this.cartService.addToCart(this.product, this.quantity);
      this.addedToCart = true;
      setTimeout(() => this.addedToCart = false, 2500);
    }
  }

  addRelatedToCart(product: Product, event: Event): void {
    event.preventDefault();
    event.stopPropagation();
    this.cartService.addToCart(product);
  }

  getStarArray(rating: number): number[] {
    return Array(5).fill(0).map((_, i) => i < Math.round(rating) ? 1 : 0);
  }

  getDiscountPercent(): number {
    if (!this.product?.originalPrice) return 0;
    return Math.round((1 - this.product.price / this.product.originalPrice) * 100);
  }
}
