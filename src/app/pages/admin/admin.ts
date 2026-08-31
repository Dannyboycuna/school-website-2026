import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { NewsItem, NewsService } from '../../services/news';
import { GalleryImage, GalleryService } from '../../services/gallery';
import { Testimonial, TestimonialsService } from '../../services/testimonials';

@Component({
  imports: [CommonModule, FormsModule],
  selector: 'app-admin',
  styleUrl: './admin.sass',
  templateUrl: './admin.html',
})
export class Admin {

  activeTab: string = 'News';
  tabs: string[] = ['News', 'Gallery', 'Testimonials'];

  newsList: NewsItem[] = [];
  newNews: NewsItem = { 
    id: 0, 
    title: '', 
    description: '', 
    date: '', 
    image: '' 
  };
  // Add this for file upload
  newNewsFile: File | null = null;

  galleryList: GalleryImage[] = [];
  newGallery: GalleryImage = { 
    id: 0, 
    title: '', 
    image: '', 
    category: '' 
  };
  // Add this for file upload
  newGalleryFile: File | null = null;

  testimonialsList: Testimonial[] = [];
  newTestimonial: Testimonial = { 
    id: 0, 
    name: '', 
    role: '', 
    text: '', 
    image: '' 
  };
  // Add this for file upload
  newTestimonialFile: File | null = null;

  constructor(
    private newsService: NewsService,
    private galleryService: GalleryService,
    private testimonialsService: TestimonialsService
  ) { 
    this.loadAllData();
  }

  loadAllData(): void {
    this.newsList = this.newsService.getNews();
    this.galleryList = this.galleryService.getAllImages();
    this.testimonialsList = this.testimonialsService.getTestimonials();
  }

  setActiveTab(tab: string): void {
    this.activeTab = tab;
    console.log('Active tab:', this.activeTab);
  }

  // Handle file selection for News
  onNewsFileSelected(event: any): void {
    const file = event.target.files[0];
    if (file) {
      this.newNewsFile = file;
      // Convert to base64 for preview
      const reader = new FileReader();
      reader.onload = (e: any) => {
        this.newNews.image = e.target.result;
      };
      reader.readAsDataURL(file);
    }
  }

  // Handle file selection for Gallery
  onGalleryFileSelected(event: any): void {
    const file = event.target.files[0];
    if (file) {
      this.newGalleryFile = file;
      const reader = new FileReader();
      reader.onload = (e: any) => {
        this.newGallery.image = e.target.result;
      };
      reader.readAsDataURL(file);
    }
  }

  // Handle file selection for Testimonials
  onTestimonialFileSelected(event: any): void {
    const file = event.target.files[0];
    if (file) {
      this.newTestimonialFile = file;
      const reader = new FileReader();
      reader.onload = (e: any) => {
        this.newTestimonial.image = e.target.result;
      };
      reader.readAsDataURL(file);
    }
  }

  addNews(): void {
    if (this.newNews.title && this.newNews.image && this.newNews.description && this.newNews.date) {
      this.newsService.addNews(this.newNews);
      this.newsList = this.newsService.getNews();
      // Reset form
      this.newNews = { id: 0, title: '', description: '', date: '', image: '' };
      this.newNewsFile = null;
      alert('News added successfully!');
    } else {
      alert('Please fill all fields and upload an image');
    }
  }

  deleteNews(id: number): void {
    if (confirm('Are you sure you want to delete this news?')) {
      this.newsService.deleteNews(id);
      this.newsList = this.newsService.getNews();
      alert('News deleted');
    }
  }

  addGalleryImage(): void {
    if (this.newGallery.category && this.newGallery.title && this.newGallery.image) {
      this.galleryService.addImage(this.newGallery);
      this.galleryList = this.galleryService.getAllImages();
      // Reset form
      this.newGallery = { id: 0, title: '', image: '', category: '' };
      this.newGalleryFile = null;
      alert('Image added successfully!');
    } else {
      alert('Please fill all fields and upload an image');
    }
  }

  deleteGalleryImage(id: number): void {
    if (confirm('Are you sure you want to delete this image?')) {
      this.galleryService.deleteImage(id);
      this.galleryList = this.galleryService.getAllImages();
      alert('Image deleted successfully!');
    }
  }

  addTestimonial(): void {
    if (this.newTestimonial.image && this.newTestimonial.name && this.newTestimonial.role && this.newTestimonial.text) {
      this.testimonialsService.addTestimonial(this.newTestimonial);
      this.testimonialsList = this.testimonialsService.getTestimonials();
      // Reset form
      this.newTestimonial = { id: 0, name: '', text: '', role: '', image: '' };
      this.newTestimonialFile = null;
      alert('Testimonial added successfully!');
    } else {
      alert('Please fill all fields and upload an image!');
    }
  }

  deleteTestimonial(id: number): void {
    if (confirm('Are you sure you want to delete this testimonial?')) {
      this.testimonialsService.deleteTestimonial(id);
      this.testimonialsList = this.testimonialsService.getTestimonials();
      alert('Testimonial deleted successfully!');
    }
  }

  getTabIcon(tab: string): string {
    switch(tab) {
      case 'News': return 'fas fa-newspaper';
      case 'Gallery': return 'fas fa-images';
      case 'Testimonials': return 'fas fa-star';
      default: return 'fas fa-cog';
    }
  }
}