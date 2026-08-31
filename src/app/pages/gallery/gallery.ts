import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { GalleryService, GalleryImage } from '../../services/gallery';

@Component({
  selector: 'app-gallery',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './gallery.html',
  styleUrls: ['./gallery.sass']
})
export class Gallery implements OnInit {
  
  allImages: GalleryImage[] = [];
  filteredImages: GalleryImage[] = [];
  categories: string[] = [];
  selectedCategory: string = 'All';

  constructor(private galleryService: GalleryService) {}

  ngOnInit(): void {
    this.allImages = this.galleryService.getAllImages();
    this.filteredImages = this.allImages;
    this.categories = ['All', ...this.galleryService.getAllCategories()];
  }

  filterByCategory(category: string): void {
    this.selectedCategory = category;
    if (category === 'All') {
      this.filteredImages = this.allImages;
    } else {
      this.filteredImages = this.galleryService.getImageByCategory(category);
    }
  }
}