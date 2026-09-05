import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { GalleryService } from '../../services/gallery';
import { GalleryModel } from '../../models/gallery.models';

@Component({
  selector: 'app-gallery',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './gallery.html',
  styleUrls: ['./gallery.sass']
})
export class Gallery implements OnInit {

  getImageUrl(imagePath: string): string {
    if (!imagePath) return '';
    if (imagePath.startsWith('http')) {
      return imagePath;
    }
    return `http://localhost:3000${imagePath}`;
  }

  allImages: GalleryModel[] = [];
  filteredImages: GalleryModel[] = [];
  categories: string[] = [];
  selectedCategory: string = 'All';

  constructor(private galleryService: GalleryService) { }

  ngOnInit(): void {
    this.galleryService.getAllImages().subscribe({
      next: (data) => {
        this.allImages = data;
        this.filteredImages = data;          // set filteredImages only after data arrives
      }
    });

    this.galleryService.getAllCategories().subscribe({
      next: (cats) => {
        this.categories = ['All', ...cats];  // spread the actual array, not the Observable
      }
    });
  }

  filterByCategory(category: string): void {
    this.selectedCategory = category;

    if (category === 'All') {
      this.filteredImages = this.allImages;
    } else {
      this.galleryService.getImageByCategory(category).subscribe({
        next: (images) => {
          this.filteredImages = images;      // assign the emitted array
        }
      });
    }
  }
}