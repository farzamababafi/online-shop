import { Component, inject, OnInit, signal } from '@angular/core';
import { PaginatorModule, PaginatorState } from 'primeng/paginator';
import { ItemCardComponent } from '../home/item-card/item-card.component';
import { InputIconModule } from 'primeng/inputicon';
import { IconFieldModule } from 'primeng/iconfield';
import { InputTextModule } from 'primeng/inputtext';
import { FormsModule } from '@angular/forms';
import { ManagerService } from '../services/manager.service';
import { Commodity } from '../models/commodities.model';

@Component({
  selector: 'app-shop',
  standalone: true,
  imports: [
    PaginatorModule,
    ItemCardComponent,
    InputIconModule,
    IconFieldModule,
    InputTextModule,
    FormsModule,
  ],
  templateUrl: './shop.component.html',
  styleUrl: './shop.component.css',
})
export class ShopComponent implements OnInit {
  private managerService = inject(ManagerService);
  items = signal<Commodity[]>([]);
  filteredItems = signal<Commodity[]>([]);

  categories = signal<string[] | undefined>([]);

  // Mock data for items

  searchQuery: string = '';
  selectedBrand: string = '';
  selectedCategory: string = '';

  // Pagination variables
  first: number = 0;
  rows: number = 4;

  // Handles pagination change
  onPageChange(event: PaginatorState) {
    this.first = event.first ?? 0;
    this.rows = event.rows ?? 4;
    this.updateItems();
  }

  // Filters items based on search query, brand, and category
  filterItems() {
    const filtered = this.items().filter((item) => {
      if (item.name && item.category) {
        const matchesSearch = item.name
          .toLowerCase()
          .includes(this.searchQuery.toLowerCase());

        const matchesCategory =
          this.selectedCategory === '' ||
          item.category === this.selectedCategory;

        return matchesSearch && matchesCategory;
      } else return;
    });

    this.filteredItems.set(filtered.slice(0, this.rows)); // Initial pagination after filtering
    this.first = 0; // Reset to the first page when applying new filters
  }

  // Update the displayed items based on pagination
  updateItems() {
    const start = this.first;
    const end = this.first + this.rows;
    this.filteredItems.set(this.items().slice(start, end)); // Slice the correct range of items
  }
  ngOnInit(): void {
    this.managerService.fetch().subscribe({
      next: (res) => {
        this.items.set(res);
        this.filteredItems.set(res.slice(0, 4)); // Display first 8 items by default

        this.categories.set([
          ...new Set(res.map((item) => (item.category ? item.category : ''))),
        ]);
      },
    });
  }
}
