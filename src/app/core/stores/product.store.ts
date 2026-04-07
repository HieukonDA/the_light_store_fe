import { computed, inject, Injectable, signal } from "@angular/core";
import { ProductService } from "../../shared/services/product.service";
import { Product } from "../../shared/interfaces/product.interface";

@Injectable({ providedIn: 'root' })

export class ProductStore {
    private productService = inject(ProductService);

    products = signal<Product[]>([]);
    isLoading = signal<boolean>(false);
    error = signal<string | null>(null);

    totalProducts = computed(() => this.products().length);

    loadFlashSales() {
    // Nếu đang tải dở rồi thì thôi không gọi API nữa (chống spam click)
    if (this.isLoading()) return;

    // Bật cờ loading lên true, xóa lỗi cũ
    this.isLoading.set(true);
    this.error.set(null);

    // Sai bảo thằng Service đi lấy data
    this.productService.getFlashSaleProducts().subscribe({
      next: (res) => {
        if (res.statusCode === 200) {
          // Lấy hàng bỏ vào kho (dùng hàm .set của signal)
          this.products.set(res.data);
        } else {
          this.error.set(res.message);
        }
        // Xong việc thì tắt loading
        this.isLoading.set(false);
      },
      error: (err) => {
        console.error(err);
        this.error.set('Máy chủ đang hắt hơi sổ mũi, vui lòng thử lại!');
        this.isLoading.set(false);
      }
    });
  }
};