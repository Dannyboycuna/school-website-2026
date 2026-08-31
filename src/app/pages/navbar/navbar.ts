import { CommonModule } from '@angular/common';
import { Component, HostListener } from '@angular/core';
import { RouterLink, RouterLinkActive } from '@angular/router';


@Component({
  imports: [CommonModule, RouterLink, RouterLinkActive],
  selector: 'app-navbar',
  styleUrl: './navbar.sass',
  templateUrl: './navbar.html',
})
export class Navbar {
  isMenuOpen = false;

  /**
   * Toggle mobile/tablet menu
   */
  toggleMenu(): void {
      this.isMenuOpen = !this.isMenuOpen;
      if (this.isMenuOpen) {
          document.body.style.overflow = 'hidden';
      } else {
          document.body.style.overflow = '';
      }
  }

  /**
   * Close mobile/tablet menu
   */
  closeMenu(): void {
      this.isMenuOpen = false;
      document.body.style.overflow = '';
  }

  /**
   * Close menu with Escape key
   */
  @HostListener('document:keydown.escape')
  onEscapeKey(): void {
      if (this.isMenuOpen) {
          this.closeMenu();
      }
  }

  /**
   * Close menu on window resize to desktop
   */
  @HostListener('window:resize')
  onResize(): void {
      if (window.innerWidth > 768 && this.isMenuOpen) {
          this.closeMenu();
      }
  }

}
  