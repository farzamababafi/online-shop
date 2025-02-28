import { Component, inject, computed, ViewChild } from '@angular/core';
import { SidebarModule } from 'primeng/sidebar';
import { ButtonModule } from 'primeng/button';

import { Sidebar } from 'primeng/sidebar';

import { RouterLink, RouterLinkActive } from '@angular/router';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-sidebar',
  standalone: true,
  imports: [RouterLink, SidebarModule, ButtonModule, RouterLinkActive],
  templateUrl: './sidebar.component.html',
  styleUrl: './sidebar.component.css',
})
export class SidebarComponent {
  private authService = inject(AuthService);
  isSignedIn = computed(() => (this.authService.isAuth() ? true : false));
  sidebarVisible: boolean = false;
  @ViewChild('sidebarRef') sidebarRef!: Sidebar;

  closeCallback(e: MouseEvent): void {
    this.sidebarRef.close(e);
  }
  onClick() {
    this.sidebarVisible = true;
  }
  onClose() {
    this.sidebarVisible = false;
  }
}
