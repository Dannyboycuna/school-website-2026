import { Component, HostListener } from '@angular/core';

@Component({
    selector: 'app-extra-lessons',
    templateUrl: './extra-lessons.component.html',
    styleUrls: ['./extra-lessons.component.sass']
})
export class ExtraLessonsComponent {
    activeModal: string | null = null;

    /**
     * Open modal for specific activity
     * @param modalId - 'taekwondo', 'chess', 'physical-education', or 'dance'
     */
    openModal(modalId: string): void {
        this.activeModal = modalId;
        document.body.style.overflow = 'hidden'; // Prevent scroll
    }

    /**
     * Close the currently open modal
     */
    closeModal(): void {
        this.activeModal = null;
        document.body.style.overflow = ''; // Restore scroll
    }

    /**
     * Close modal when clicking on overlay background
     * @param event - Mouse event
     */
    closeModalOnOverlay(event: MouseEvent): void {
        // Only close if click is directly on the overlay (not on modal content)
        if ((event.target as HTMLElement).classList.contains('modal-overlay')) {
            this.closeModal();
        }
    }

    /**
     * Close modal with Escape key
     */
    @HostListener('document:keydown.escape')
    onEscapeKey(): void {
        if (this.activeModal) {
            this.closeModal();
        }
    }
}