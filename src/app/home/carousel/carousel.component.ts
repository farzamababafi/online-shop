import { Component, inject, input, OnInit, signal } from '@angular/core';
import { Commodity as Product } from '../../models/commodities.model';

import { CarouselModule } from 'primeng/carousel';
import { ItemCardComponent } from '../item-card/item-card.component';
import { ManagerService } from '../../services/manager.service';
@Component({
  selector: 'app-carousel',
  standalone: true,
  imports: [CarouselModule, ItemCardComponent],
  templateUrl: './carousel.component.html',
  styleUrl: './carousel.component.css',
})
export class CarouselComponent implements OnInit {
  title = input.required<string>();
  products = signal<Product[]>([]);
  private managerService = inject(ManagerService);
  responsiveOptions: any[] | undefined;

  ngOnInit() {
    this.managerService.fetch().subscribe({
      next: (res) => this.products.set(res.slice(0, 8)),
    });

    this.responsiveOptions = [
      {
        breakpoint: '1270px',
        numVisible: 3,
        numScroll: 3,
      },
      {
        breakpoint: '991px',
        numVisible: 2,
        numScroll: 1,
      },
      {
        breakpoint: '667px',
        numVisible: 1,
        numScroll: 1,
      },
    ];
  }
}
