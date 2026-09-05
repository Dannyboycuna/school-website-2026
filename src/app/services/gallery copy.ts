import { Injectable,PLATFORM_ID, Inject } from '@angular/core';;
import { isPlatformBrowser } from '@angular/common';


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
  private storageKey = 'schoolGallery';
  private isBrowser:boolean;
  private defaultImages: GalleryImage[] = [{
    id: 1,
    title: 'Science Lab',
    image: "assets/images/pic.jpg",
    category: 'Science'
  }]

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
    }
  ];

  constructor(@Inject(PLATFORM_ID) platformId: Object) {
    this.isBrowser = isPlatformBrowser(platformId);
    this.initializeStorage();
  }

  private initializeStorage(): void {
    // if (typeof localStorage === 'undefined') {
    //   console.warn('localStorage is not available');
    //   return;
    // }
    if (!this.isBrowser) return;

    
    if (!localStorage.getItem(this.storageKey)) {
      localStorage.setItem(this.storageKey, JSON.stringify(this.defaultImages));
    }
  }

  getAllImages(): GalleryImage[] {
// if(typeof localStorage ==='undefined'){
//   return this.defaultImages;
// }

if(!this.isBrowser){
  return this.defaultImages;
}
    const data = localStorage.getItem(this.storageKey);
    return data ? JSON.parse(data) : this.defaultImages
  }

  getImageByCategory(category: string): GalleryImage[] {
        return this.getAllImages().filter(img => img.category === category);

  }

  getAllCategories(): string[] {
    return [...new Set(this.getAllImages().map(img => img.category))];
  }



  addImage(item: GalleryImage): void {
    if (!this.isBrowser) return;

// if(typeof localStorage ==='undefined') return;

    const images = this.getAllImages();
    item.id = images.length > 0 ? Math.max(...images.map(img => img.id)) + 1 : 1
    images.unshift(item)
    localStorage.setItem(this.storageKey, JSON.stringify(images));
  }

  deleteImage(id: number): void {
    if (!this.isBrowser) return;

if(typeof localStorage==='undefined') return;

    let images = this.getAllImages();
    images.filter(item=>item.id !==id);
    localStorage.setItem(this.storageKey, JSON.stringify(images));
  }
}