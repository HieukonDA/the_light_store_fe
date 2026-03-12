import { Component, inject } from '@angular/core';
import { RouterLink } from '@angular/router';
import { CommonModule } from '@angular/common';
import { CartService } from '../../services/cart.service';
import { CartItem } from '../../models/product.model';

@Component({
  selector: 'app-cart',
  standalone: true,
  imports: [RouterLink, CommonModule],
  templateUrl: './cart.component.html',
  styleUrl: './cart.component.scss'
})
export class CartComponent {
  private cartService = inject(CartService);

  items = this.cartService.items;
  totalPrice = this.cartService.totalPrice;
  totalItems = this.cartService.totalItems;

  updateQuantity(item: CartItem, quantity: number): void {
    this.cartService.updateQuantity(item.product.id, quantity);
  }

  removeItem(item: CartItem): void {
    this.cartService.removeFromCart(item.product.id);
  }

  clearCart(): void {
    this.cartService.clearCart();
  }

  getShipping(): number {
    return this.totalPrice() >= 75 ? 0 : 9.99;
  }

  getTotal(): number {
    return this.totalPrice() + this.getShipping();
  }
}
