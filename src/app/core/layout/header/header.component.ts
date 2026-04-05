import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-header',
  imports: [FormsModule, CommonModule],
  templateUrl: './header.component.html',
  styleUrl: './header.component.css',
})
export class HeaderComponent {
  searchQuery = '';
  
  brands = [
    'IPHONE',
    'SAMSUNG',
    'OPPO',
    'HUAWEI',
    'REALME',
    'VIVO',
    'XIAOMI',
    'NOKIA'
  ];

  onSearch() {
    console.log('Searching for:', this.searchQuery);
  }
}
