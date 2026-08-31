import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { RouterLink } from '@angular/router';


@Component({
  imports: [CommonModule, RouterLink, FormsModule, FormsModule],
  selector: 'app-contact',
  styleUrl: './contact.sass',
  templateUrl: './contact.html',
})
export class Contact {

  // submitForm(){
  //   alert('Thank you for your message! We will get back to you soon.')
  // }

  // WhatsApp number (without +)
  private whatsappNumber: string = '258876325698';
  
  // Form data
  contactData = {
    name: '',
    email: '',
    subject: '',
    message: ''
  };

  // UI states
  isSubmitting: boolean = false;
  showSuccess: boolean = false;
  errorMessage: string = '';

  constructor() { }

  // Main method - sends to WhatsApp
  sendToWhatsApp(): void {
    // Validate form
    if (!this.validateForm()) {
      return;
    }

    this.isSubmitting = true;
    this.showSuccess = false;
    this.errorMessage = '';

    try {
      // Build and encode message
      const message = this.buildWhatsAppMessage();
      const encodedMessage = encodeURIComponent(message);
      
      // Open WhatsApp
      const whatsappUrl = `https://wa.me/${this.whatsappNumber}?text=${encodedMessage}`;
      window.open(whatsappUrl, '_blank');
      
      // Show success
      this.showSuccess = true;
      this.isSubmitting = false;
      
      // Optional: Reset form
      // this.resetForm();
      
    } catch (error) {
      this.errorMessage = 'Failed to open WhatsApp. Please try again.';
      this.isSubmitting = false;
      console.error('WhatsApp error:', error);
    }
  }

  // Build professional WhatsApp message
  private buildWhatsAppMessage(): string {
    const { name, email, subject, message } = this.contactData;
    
    let msg = `Hello Colegio Estrela Do Indico,\n\n`;
    msg += `I would like to get in touch with you.\n\n`;
    msg += `📋 *My Details:*\n`;
    msg += `👤 *Name:* ${name}\n`;
    msg += `📧 *Email:* ${email}\n`;
    msg += `📝 *Subject:* ${subject}\n\n`;
    msg += `💬 *Message:*\n${message}\n\n`;
    msg += `---\n`;
    msg += `Sent from Colegio Estrela Do Indico Website`;
    
    return msg;
  }

  // Validate all fields
  private validateForm(): boolean {
    const { name, email, subject, message } = this.contactData;
    
    if (!name || !email || !subject || !message) {
      this.errorMessage = 'Please fill in all fields.';
      return false;
    }
    
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      this.errorMessage = 'Please enter a valid email address.';
      return false;
    }
    
    if (message.length < 10) {
      this.errorMessage = 'Please write a longer message (minimum 10 characters).';
      return false;
    }
    
    this.errorMessage = '';
    return true;
  }

  // Reset form (optional)
  resetForm(): void {
    this.contactData = {
      name: '',
      email: '',
      subject: '',
      message: ''
    };
  }

  // Close success message
  closeSuccess(): void {
    this.showSuccess = false;
  }
}
