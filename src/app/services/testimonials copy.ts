import { Injectable } from '@angular/core';

export interface Testimonial {
  id: number;
  name: string;
  role: string;
  text: string;
  image: string;
}

@Injectable({
  providedIn: 'root'
})
export class TestimonialsService {

  private testimonials: Testimonial[] = [
    {
      id: 1,
      name: 'Maria Silva',
      role: 'Parent - Grade 3',
      text: 'Colégio Estrela do Índico is an excellent school. My child has learned so much and loves going to school every day!',
      image: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=150&q=80'
    },
    {
      id: 2,
      name: 'João Santos',
      role: 'Parent - Grade 7',
      text: 'The teachers are very dedicated and the curriculum is world-class. We are very happy with our choice.',
      image: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&q=80'
    },
    {
      id: 3,
      name: 'Ana Ferreira',
      role: 'Parent - Grade 5',
      text: 'Great facilities, caring teachers, and amazing learning environment. Highly recommend!',
      image: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=150&q=80'
    },
    {
      id: 4,
      name: 'Carlos Matlava',
      role: 'Parent - Cambridge Student',
      text: 'The Cambridge curriculum is preparing my son perfectly for university. Excellent results!',
      image: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=150&q=80'
    }
  ];

  constructor() { }

  getTestimonials(): Testimonial[] {
    return this.testimonials;
  }

  addTestimonial(testimonial: Testimonial): void {
    testimonial.id = Math.max(...this.testimonials.map(t => t.id), 0) + 1;
    this.testimonials.push(testimonial);
  }
}