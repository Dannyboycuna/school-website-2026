import { CommonModule } from '@angular/common';
import { Component, HostListener } from '@angular/core';
import { RouterLink } from '@angular/router';

@Component({
  imports: [CommonModule, RouterLink],
  selector: 'app-home',
  styleUrl: './home.sass',
  templateUrl: './home.html',
})
export class Home {
  activeModal: string | null = null;

  openModal(modalId: string): void {
    this.activeModal = modalId;
    document.body.style.overflow = 'hiden';
  }

  closeModal(): void {
    this.activeModal = null;
    document.body.style.overflow = '';
  }

  closeModalOnOverlay(event: MouseEvent): void {
    if ((event.target as HTMLElement).classList.contains('modal-overlay')) {
      this.closeModal();
    }

    
    
  

}
@HostListener('document:keydown.escape') 
onEscapeKey(): void { 
  if (this.activeModal) { 
    this.closeModal(); 
  } 
}   


}
