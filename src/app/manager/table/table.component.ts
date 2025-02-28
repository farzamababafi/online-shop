import { Component, inject, OnInit, signal } from '@angular/core';

import { FormsModule } from '@angular/forms';
import { TableModule } from 'primeng/table';
import { CurrencyPipe } from '@angular/common';
import { FormComponent } from '../form/form.component';
import { ManagerService } from '../../services/manager.service';
import { Commodity } from '../../models/commodities.model';

@Component({
  selector: 'app-table',
  standalone: true,
  imports: [FormsModule, TableModule, CurrencyPipe, FormComponent],
  templateUrl: './table.component.html',
  styleUrl: './table.component.css',
})
export class TableComponent implements OnInit {
  private managerService = inject(ManagerService);
  isFormShow = signal<boolean>(false);
  commodities = signal<Commodity[]>([]);
  selectedCommodity: any;
  searchTerm: string = '';

  ngOnInit() {
    this.managerService.fetch().subscribe({
      next: (res) => this.commodities.set(res),
    });
    /* this.commodities = [
      {
        name: 'Product A',
        category: 'Category 1',
        inventoryStatus: 'In Stock',
        price: 100,
        quantity: 10,
      },
      {
        name: 'Product B',
        category: 'Category 2',
        inventoryStatus: 'Out of Stock',
        price: 200,
        quantity: 0,
      },
      {
        name: 'Product C',
        category: 'Category 3',
        inventoryStatus: 'Low Stock',
        price: 150,
        quantity: 5,
      },
      {
        name: 'Product D',
        category: 'Category 1',
        inventoryStatus: 'In Stock',
        price: 120,
        quantity: 7,
      },
      {
        name: 'Product E',
        category: 'Category 2',
        inventoryStatus: 'Out of Stock',
        price: 220,
        quantity: 0,
      },
      {
        name: 'Product F',
        category: 'Category 3',
        inventoryStatus: 'In Stock',
        price: 175,
        quantity: 3,
      },
      {
        name: 'Product G',
        category: 'Category 1',
        inventoryStatus: 'In Stock',
        price: 90,
        quantity: 15,
      },
      {
        name: 'Product H',
        category: 'Category 2',
        inventoryStatus: 'Low Stock',
        price: 130,
        quantity: 4,
      },
      {
        name: 'Product I',
        category: 'Category 3',
        inventoryStatus: 'In Stock',
        price: 300,
        quantity: 8,
      },
      {
        name: 'Product J',
        category: 'Category 1',
        inventoryStatus: 'Out of Stock',
        price: 110,
        quantity: 0,
      },
      {
        name: 'Product K',
        category: 'Category 2',
        inventoryStatus: 'In Stock',
        price: 250,
        quantity: 12,
      },
    ];*/
  }

  // Filter the table based on the search term
  filterData() {
    return this.commodities().filter(
      (item) =>
        item.name?.toLowerCase().includes(this.searchTerm.toLowerCase()) ||
        item.category?.toLowerCase().includes(this.searchTerm.toLowerCase())
    );
  }

  // Dummy function for add, edit, and delete
  showForm() {
    this.isFormShow.set(true);
  }

  /*editCommodity(commodity: any) {
    console.log('Edit commodity:', commodity);
  }*/

  deleteCommodity(id: string) {
    this.managerService.deleteCommodit(id).subscribe({
      next: (res) => {
        window.alert(res.message);
      },
      complete: () => window.location.reload(),
    });
  }
  closeForm(event: boolean) {
    this.isFormShow.set(event);
  }
}
