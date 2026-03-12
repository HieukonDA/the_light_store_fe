import { Component, OnInit, inject } from '@angular/core';
import { RouterLink } from '@angular/router';
import { CommonModule } from '@angular/common';
import { ProductService } from '../../services/product.service';
import { CartService } from '../../services/cart.service';
import { Product } from '../../models/product.model';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [RouterLink, CommonModule],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss'
})
export class HomeComponent implements OnInit {
  private productService = inject(ProductService);
  private cartService = inject(CartService);

  featuredProducts: Product[] = [];
  categories = [
    { name: 'Pendant Lights', icon: '🔆', description: 'Modern hanging lights for any space' },
    { name: 'Chandeliers', icon: '✨', description: 'Elegant centerpiece lighting' },
    { name: 'Floor Lamps', icon: '🕯️', description: 'Stand-alone ambient lighting' },
    { name: 'Table Lamps', icon: '💡', description: 'Versatile task and mood lighting' },
    { name: 'Wall Lights', icon: '🌟', description: 'Space-saving decorative lights' },
    { name: 'Outdoor', icon: '☀️', description: 'Weather-resistant outdoor options' },
  ];

  ngOnInit(): void {
    this.productService.getFeaturedProducts().subscribe(products => {
      this.featuredProducts = products;
    });
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
