import {
  Component,
  signal,
  HostListener,
  OnInit,
  inject,
  effect,
  computed,
} from '@angular/core';
import { RouterLink, RouterLinkActive } from '@angular/router';
import { SidebarComponent } from './sidebar/sidebar.component';
import { AuthService } from '../services/auth.service';
@Component({
  selector: 'app-header',
  standalone: true,
  imports: [RouterLink, SidebarComponent, RouterLinkActive],
  templateUrl: './header.component.html',
  styleUrl: './header.component.css',
})
export class HeaderComponent implements OnInit {
  private authService = inject(AuthService);
  showSidebar = signal(false);
  isSignedIn = computed(() => (this.authService.isAuth() ? true : false));

  @HostListener('window:resize', ['$event'])
  onResize(event: Event) {
    // Check if the window width is less than 550px
    if (window.innerWidth < 550) {
      this.showSidebar.set(true); // Set show to false
    } else {
      this.showSidebar.set(false); // Set show to true if width is 550px or greater
    }
  }

  ngOnInit(): void {
    if (window.innerWidth < 550) {
      this.showSidebar.set(true); // Set show to false
    } else {
      this.showSidebar.set(false); // Set show to true if width is 550px or greater
    }
  }
  // Optionally call onResize on component initialization to set the initial state
  onLogOut() {
    if (this.isSignedIn()) {
      this.authService.reset();
    }
  }
}
