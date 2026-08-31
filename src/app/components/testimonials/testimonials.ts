import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Testimonial, TestimonialsService } from '../../services/testimonials';

@Component({
  selector: 'app-testimonials',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './testimonials.html',
  styleUrls: ['./testimonials.sass']
})
export class Testimonials implements OnInit {
  
  testimonials: Testimonial[] = [];

  constructor(private testimonialsService: TestimonialsService) {}

  ngOnInit(): void {
    this.testimonials = this.testimonialsService.getTestimonials();
  }
}