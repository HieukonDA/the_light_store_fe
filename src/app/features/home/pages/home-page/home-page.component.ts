import { Component } from '@angular/core';
import { HeroSectionsComponent } from "../../components/hero-sections/hero-sections.component";
import { FlashSaleComponent } from "../../components/flash-sale/flash-sale.component";

@Component({
  selector: 'app-home-page',
  imports: [HeroSectionsComponent, FlashSaleComponent],
  templateUrl: './home-page.component.html',
  styleUrl: './home-page.component.css',
})
export class HomePage {}
