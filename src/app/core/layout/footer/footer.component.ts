import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-footer',
  imports: [CommonModule],
  templateUrl: './footer.component.html',
  styleUrl: './footer.component.css',
})
export class FooterComponent {
  currentYear = new Date().getFullYear();

  companyInfo = [
    'GIỚI THIỆU VỀ CÔNG TY',
    'CẤU HỘI THƯƠNG GẬP',
    'CHÍNH SÁCH BẢO MẬT',
    'QUY CHẾ HOẠT ĐỘNG'
  ];

  warranty = [
    'KIỂM TRA HÓA ĐƠN ĐIỆN TỬ',
    'TRA CỨU THÔNG TIN BẢO HÀNH',
    'TÌN TUYÊN DỤNG',
    'TIN KHUYẾN MẠI',
    'HƯỚNG DẪN ONLINE'
  ];

  storeInfo = [
    'HỆ THỐNG CỬA HÀNG',
    'HỆ THỐNG BẢO HÀNH',
    'KIỂM TRA HÀNG APPLE CHÍNH HÃNG',
    'GIỚI THIỆU ĐỂI MẬY',
    'CHÍNH SÁCH ĐỔI TRẢ'
  ];
}
