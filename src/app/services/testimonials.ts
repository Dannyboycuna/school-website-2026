import { Injectable, PLATFORM_ID, Inject } from '@angular/core';;
import { isPlatformBrowser } from '@angular/common';

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
  private storageKey = 'schoolTestimonial';
  private isBrowser: boolean;

  private testimonials: Testimonial[] = [
    {
      id: 1,
      name: 'Maria Silva',
      role: 'Parent - Grade 3',
      text: 'Colégio Estrela do Índico is an excellent school. My child has learned so much and loves going to school every day!',
      image: 'assets/images/pic1.jpg'
    },
    {
      id: 2,
      name: 'João Santos',
      role: 'Parent - Grade 7',
      text: 'The teachers are very dedicated and the curriculum is world-class. We are very happy with our choice.',
      image: 'assets/images/pic3.jpg'
    },
    {
      id: 3,
      name: 'Ana Ferreira',
      role: 'Parent - Grade 5',
      text: 'Great facilities, caring teachers, and amazing learning environment. Highly recommend!',
      image: 'assets/images/pic4.jpg'
    },
    {
      id: 4,
      name: 'Carlos Matlava',
      role: 'Parent - Cambridge Student',
      text: 'The Cambridge curriculum is preparing my son perfectly for university. Excellent results!',
      image: 'assets/images/pic3.jpg'
    }
  ];

  constructor(@Inject(PLATFORM_ID) platformId: Object) {
    this.isBrowser = isPlatformBrowser(platformId);
    this.initializeStorage();
  }

  private initializeStorage(): void {
    // if (typeof localStorage === 'undefined') {
    //   console.warn('localStorage is not available');
    //   return
    // }
    if (!this.isBrowser) return

    if (!localStorage.getItem(this.storageKey)) {
      localStorage.setItem(this.storageKey, JSON.stringify(this.testimonials));
    }
  }

  getTestimonials(): Testimonial[] {
    // if (typeof localStorage === 'undefined') {
    //   return this.testimonials
    // }
    // return this.testimonials;

    if (!this.isBrowser) {
      return this.testimonials;
    }
    const data = localStorage.getItem(this.storageKey);
    return data ? JSON.parse(data) : this.testimonials;
  }

  addTestimonial(item: Testimonial): void {
    if (!this.isBrowser) return;

    const testimon = this.getTestimonials();
    item.id = testimon.length > 0 ? Math.max(...testimon.map(tes => tes.id)) + 1 : 1;
    testimon.unshift(item)
    localStorage.setItem(this.storageKey, JSON.stringify(testimon))

    // testimonial.id = Math.max(...this.testimonials.map(t => t.id), 0) + 1;
    // this.testimonials.push(testimonial);
  }

  deleteTestimonial(id: number): void {
    // if(typeof localStorage ==='undefined') return;
    if (!this.isBrowser) return

    let testimonial = this.getTestimonials();
    testimonial.filter(item => item.id !== id)
    localStorage.setItem(this.storageKey, JSON.stringify(testimonial))
  }
}