import { Injectable } from '@angular/core';

export interface GalleryImage {
  id: number;
  title: string;
  image: string;
  category: string;
}

@Injectable({
  providedIn: 'root'
})
export class GalleryService {

  private images: GalleryImage[] = [
    {
      id: 1,
      title: 'Classroom Learning',
      image: 'https://images.unsplash.com/photo-1427504494785-cdbeafc45b85?w=400&q=80',
      category: 'Academics'
    },
    {
      id: 2,
      title: 'Science Lab',
      image: 'https://images.unsplash.com/photo-1530124566582-a618bc2615dc?w=400&q=80',
      category: 'Facilities'
    },
    {
      id: 3,
      title: 'Sports Activities',
      image: 'https://images.unsplash.com/photo-1461896836934-ffe607ba8211?w=400&q=80',
      category: 'Sports'
    },
    {
      id: 4,
      title: 'Library',
      image: 'https://images.unsplash.com/photo-150784272343-583f20270319?w=400&q=80',
      category: 'Facilities'
    },
    {
      id: 5,
      title: 'Art Class',
      image: 'https://images.unsplash.com/photo-1513364776144-60967b0f800f?w=400&q=80',
      category: 'Arts'
    },
    {
      id: 6,
      title: 'School Event',
      image: 'https://images.unsplash.com/photo-1552664730-d307ca884978?w=400&q=80',
      category: 'Events'
    },
    {
      id: 7,
      title: 'Outdoor Learning',
      image: 'https://images.unsplash.com/photo-1577720643272-265e434a0834?w=400&q=80',
      category: 'Activities'
    },
    {
      id: 8,
      title: 'School Cafeteria',
      image: 'https://images.unsplash.com/photo-1555939594-58d7cb561404?w=400&q=80',
      category: 'Facilities'
    }
  ];

  constructor() { }

  getImages(): GalleryImage[] {
    return this.images;
  }

  getImagesByCategory(category: string): GalleryImage[] {
    return this.images.filter(img => img.category === category);
  }

  getAllCategories(): string[] {
    return [...new Set(this.images.map(img => img.category))];
  }
}