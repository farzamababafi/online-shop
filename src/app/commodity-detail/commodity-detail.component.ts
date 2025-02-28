import { Component, inject, OnInit, signal } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ManagerService } from '../services/manager.service';
import { Commodity } from '../models/commodities.model';
import { LoadingComponent } from '../loading/loading.component';
@Component({
  selector: 'app-commodity-detail',
  standalone: true,
  imports: [LoadingComponent],
  templateUrl: './commodity-detail.component.html',
  styleUrl: './commodity-detail.component.css',
})
export class CommodityDetailComponent implements OnInit {
  isLoading = signal(false);
  private activatedRoute = inject(ActivatedRoute);
  private managerService = inject(ManagerService);
  imageUrl: string | null = null; // Variable to store the image URL
  userData = signal<Commodity>({});
  ngOnInit(): void {
    const userId = this.activatedRoute.snapshot.params['id'];
    this.isLoading.set(true);
    this.managerService.fetchById(userId).subscribe({
      next: (res) => {
        this.userData.set(res);

        this.managerService.getImage(res.image).subscribe((blob) => {
          const url = window.URL.createObjectURL(blob);
          this.imageUrl = url; // Store the image URL
        });
      },
      complete: () => this.isLoading.set(false),
      error: (error) => {
        this.isLoading.set(false);
        window.alert(error);
      },
    });
  }
}
