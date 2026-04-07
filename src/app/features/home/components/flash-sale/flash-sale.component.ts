import { Component, inject } from '@angular/core';
import { ProductCardComponent } from '../../../../shared/components/product-card/product-card.component';
import { CommonModule } from '@angular/common';
import { Product } from '../../../../shared/interfaces/product.interface';
import { ProductService } from '../../../../shared/services/product.service';
import { error } from 'console';
import { ProductStore } from '../../../../core/stores/product.store';

@Component({
  selector: 'app-flash-sale',
  imports: [ProductCardComponent, CommonModule],
  templateUrl: './flash-sale.component.html',
  styles: ``,
})
export class FlashSaleComponent {
  flashSaleProducts : Product[] = [];

  private productService = inject(ProductService);
  public productStore = inject(ProductStore);

  ngOnInit() {
    this.productStore.loadFlashSales();
  }

}
