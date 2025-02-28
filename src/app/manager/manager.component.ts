import { Component } from '@angular/core';
import { TableComponent } from './table/table.component';

@Component({
  selector: 'app-manager',
  standalone: true,
  imports: [TableComponent],
  templateUrl: './manager.component.html',
  styleUrl: './manager.component.css',
})
export class ManagerComponent {}
