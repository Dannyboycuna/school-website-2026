import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TestimonialsService } from '../../services/testimonials';
import { TestimonialModel } from '../../models/testimonial.models';

@Component({
  selector: 'app-testimonial',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './testimonials.html',
  styleUrls: ['./testimonials.sass']
})
export class Testimonials implements OnInit {

  getTestimonialUrl(testimonialPath: string): string {
    if (!testimonialPath) return '';
    if (testimonialPath.startsWith('http')) {
      return testimonialPath;
    }
    return `http://localhost:3000${testimonialPath}`;
  }

  allTestimonial: TestimonialModel[] = [];
  filteredTestimonial: TestimonialModel[] = [];
  categories: string[] = [];
  selectedCategory: string = 'All';

  constructor(private testimonialsService: TestimonialsService) { }

  ngOnInit(): void {
    this.testimonialsService.getAllTestimonials().subscribe({
      next: (data) => {
        this.allTestimonial = data;
        this.filteredTestimonial = data;          // set filteredImages only after data arrives
      }
    });
  }
}