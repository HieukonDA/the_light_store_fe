import { Component } from '@angular/core';
import { BannerSliderComponent } from '../baner-slider/banner-slider.component';
import { CategoryMenuComponent } from '../category-menu/category-menu.component';

@Component({
  selector: 'app-hero-sections',
  imports: [BannerSliderComponent, CategoryMenuComponent],
  templateUrl: './hero-sections.component.html',
  styles: ``,
})
export class HeroSectionsComponent {}
