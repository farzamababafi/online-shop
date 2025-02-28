import { Component, OnInit, inject } from '@angular/core';
import { ChartModule } from 'primeng/chart';
import { ManagerService } from '../../services/manager.service';

@Component({
  selector: 'app-bar-chart',
  standalone: true,
  imports: [ChartModule],
  templateUrl: './bar-chart.component.html',
  styleUrl: './bar-chart.component.css',
})
export class BarChartComponent implements OnInit {
  private managerService = inject(ManagerService);
  dataOption: any;
  options: any;

  ngOnInit() {
    let labels = [];
    let dataList = [];
    this.managerService.fetchByGroup().subscribe({
      next: (res) => {
        labels = res.map((item) => item.category);
        dataList = res.map((item) => item.count);
        this.dataOption = {
          labels: labels,
          datasets: [
            {
              label: 'Items In Inventory',
              backgroundColor: documentStyle.getPropertyValue('--blue-500'),
              borderColor: documentStyle.getPropertyValue('--blue-500'),
              data: dataList,
              barThickness: 40,
            },
          ],
        };
      },
    });

    const documentStyle = getComputedStyle(document.documentElement);
    const textColor = documentStyle.getPropertyValue('--text-color');
    const textColorSecondary = documentStyle.getPropertyValue(
      '--text-color-secondary'
    );
    const surfaceBorder = documentStyle.getPropertyValue('--surface-border');

    this.options = {
      maintainAspectRatio: false,
      aspectRatio: 0.5,
      plugins: {
        legend: {
          labels: {
            color: textColor,
          },
          position: 'bottom',
        },
      },
      scales: {
        x: {
          ticks: {
            color: textColorSecondary,
            font: {
              weight: 500,
            },
          },
          grid: {
            color: surfaceBorder,
            drawBorder: false,
            display: false,
          },
        },
        y: {
          ticks: {
            color: textColorSecondary,
          },
          grid: {
            color: surfaceBorder,
            drawBorder: false,
          },
        },
      },
    };
  }
}
