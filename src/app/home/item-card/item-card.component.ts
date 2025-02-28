import { Component, inject, input, OnInit } from '@angular/core';
import { RouterLink } from '@angular/router';
import { Commodity } from '../../models/commodities.model';
import { ManagerService } from '../../services/manager.service';
@Component({
  selector: 'app-item-card',
  standalone: true,
  imports: [RouterLink],
  templateUrl: './item-card.component.html',
  styleUrl: './item-card.component.css',
})
export class ItemCardComponent implements OnInit {
  private managerService = inject(ManagerService);
  imageUrl: string | null = null; // Variable to store the image URL
  item = input<Commodity>();
  ngOnInit(): void {
    this.managerService.getImage(this.item()?.image).subscribe((blob) => {
      const url = window.URL.createObjectURL(blob);
      this.imageUrl = url; // Store the image URL
    });
  }
}
