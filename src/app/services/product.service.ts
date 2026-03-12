import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { Product } from '../models/product.model';

@Injectable({
  providedIn: 'root'
})
export class ProductService {
  private products: Product[] = [
    {
      id: 1,
      name: 'Modern LED Pendant Light',
      description: 'A sleek and modern LED pendant light perfect for dining rooms and kitchen islands. Features adjustable height and warm white light.',
      price: 129.99,
      originalPrice: 179.99,
      imageUrl: 'https://images.unsplash.com/photo-1524484485831-a92ffc0de03f?w=600&q=80',
      category: 'Pendant Lights',
      rating: 4.7,
      reviewCount: 128,
      inStock: true,
      featured: true,
      badge: 'Sale'
    },
    {
      id: 2,
      name: 'Classic Chandelier',
      description: 'Elegant crystal chandelier that adds a touch of luxury to any room. Perfect for entryways and formal dining rooms.',
      price: 349.99,
      imageUrl: 'https://images.unsplash.com/photo-1565814636199-ae8133055c1c?w=600&q=80',
      category: 'Chandeliers',
      rating: 4.9,
      reviewCount: 64,
      inStock: true,
      featured: true,
      badge: 'Best Seller'
    },
    {
      id: 3,
      name: 'Industrial Wall Sconce',
      description: 'Rustic industrial wall sconce with Edison bulb. Great for hallways, living rooms, and bedrooms.',
      price: 59.99,
      originalPrice: 79.99,
      imageUrl: 'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=600&q=80',
      category: 'Wall Lights',
      rating: 4.5,
      reviewCount: 92,
      inStock: true,
      featured: true
    },
    {
      id: 4,
      name: 'Minimalist Floor Lamp',
      description: 'Clean and minimalist floor lamp with an adjustable arm. Perfect reading light for modern interiors.',
      price: 89.99,
      imageUrl: 'https://images.unsplash.com/photo-1507473885765-e6ed057f782c?w=600&q=80',
      category: 'Floor Lamps',
      rating: 4.6,
      reviewCount: 43,
      inStock: true,
      featured: true
    },
    {
      id: 5,
      name: 'Smart LED Strip Lights',
      description: 'App-controlled RGB LED strip lights. 16 million colors, works with Alexa and Google Home.',
      price: 39.99,
      imageUrl: 'https://images.unsplash.com/photo-1558618047-3c8c76ca7d13?w=600&q=80',
      category: 'LED Strips',
      rating: 4.4,
      reviewCount: 215,
      inStock: true,
      badge: 'New'
    },
    {
      id: 6,
      name: 'Vintage Table Lamp',
      description: 'Charming vintage-style table lamp with fabric shade. Perfect for bedside tables and desks.',
      price: 74.99,
      originalPrice: 99.99,
      imageUrl: 'https://images.unsplash.com/photo-1513475382585-d06e58bcb0e0?w=600&q=80',
      category: 'Table Lamps',
      rating: 4.3,
      reviewCount: 56,
      inStock: true
    },
    {
      id: 7,
      name: 'Solar Garden Lights (4-pack)',
      description: 'Weather-resistant solar powered garden lights. Automatically turns on at dusk.',
      price: 29.99,
      imageUrl: 'https://images.unsplash.com/photo-1617863536027-7b2c3e7e61b1?w=600&q=80',
      category: 'Outdoor',
      rating: 4.2,
      reviewCount: 87,
      inStock: true
    },
    {
      id: 8,
      name: 'Recessed Ceiling Downlights (6-pack)',
      description: 'Dimmable LED recessed downlights for a clean, integrated look. Easy installation.',
      price: 64.99,
      imageUrl: 'https://images.unsplash.com/photo-1565814636199-ae8133055c1c?w=600&q=80',
      category: 'Ceiling Lights',
      rating: 4.8,
      reviewCount: 134,
      inStock: false
    },
    {
      id: 9,
      name: 'Geometric Pendant Cluster',
      description: 'Eye-catching geometric pendant cluster with three individual pendants. Statement piece for any room.',
      price: 199.99,
      originalPrice: 249.99,
      imageUrl: 'https://images.unsplash.com/photo-1524484485831-a92ffc0de03f?w=600&q=80',
      category: 'Pendant Lights',
      rating: 4.6,
      reviewCount: 31,
      inStock: true,
      badge: 'Sale'
    },
    {
      id: 10,
      name: 'Bathroom Vanity Light Bar',
      description: 'Modern brushed nickel vanity light bar with frosted glass shades. Perfect for bathroom mirrors.',
      price: 109.99,
      imageUrl: 'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=600&q=80',
      category: 'Bathroom',
      rating: 4.5,
      reviewCount: 78,
      inStock: true
    },
    {
      id: 11,
      name: 'Desk LED Task Lamp',
      description: 'Flexible USB-powered LED desk lamp with multiple brightness levels and color temperatures.',
      price: 44.99,
      imageUrl: 'https://images.unsplash.com/photo-1507473885765-e6ed057f782c?w=600&q=80',
      category: 'Table Lamps',
      rating: 4.7,
      reviewCount: 162,
      inStock: true,
      badge: 'New'
    },
    {
      id: 12,
      name: 'Moroccan Lantern Set',
      description: 'Decorative Moroccan-inspired lanterns for indoor and outdoor use. Set of 3 in varying sizes.',
      price: 54.99,
      originalPrice: 69.99,
      imageUrl: 'https://images.unsplash.com/photo-1617863536027-7b2c3e7e61b1?w=600&q=80',
      category: 'Outdoor',
      rating: 4.4,
      reviewCount: 49,
      inStock: true
    }
  ];

  getProducts(): Observable<Product[]> {
    return of(this.products);
  }

  getProductById(id: number): Observable<Product | undefined> {
    return of(this.products.find(p => p.id === id));
  }

  getFeaturedProducts(): Observable<Product[]> {
    return of(this.products.filter(p => p.featured));
  }

  getProductsByCategory(category: string): Observable<Product[]> {
    return of(this.products.filter(p => p.category === category));
  }

  getCategories(): Observable<string[]> {
    const categories = [...new Set(this.products.map(p => p.category))];
    return of(categories);
  }

  searchProducts(query: string): Observable<Product[]> {
    const lowerQuery = query.toLowerCase();
    return of(this.products.filter(p =>
      p.name.toLowerCase().includes(lowerQuery) ||
      p.description.toLowerCase().includes(lowerQuery) ||
      p.category.toLowerCase().includes(lowerQuery)
    ));
  }
}
