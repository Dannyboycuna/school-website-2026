import { Injectable,PLATFORM_ID, Inject } from '@angular/core';;
import { isPlatformBrowser } from '@angular/common';


export interface NewsItem {
  id: number;
  title: string;
  description: string;
  date: string;
  image: string;
}

@Injectable({
  providedIn: 'root'
})
export class NewsService {
  
  private storageKey = 'schoolNews';
  private isBrowser:boolean;

  private defaultNews: NewsItem[] = [
    {
      id: 1,
      title: 'Science Fair 2026',
      description: 'Students showcase amazing science projects and experiments',
      date: 'March 15, 2026',
      image: 'assets/images/pic3.jpg'
    },
    {
      id: 2,
      title: 'Sports Day',
      description: 'Family sports event - All welcome! Great fun and competition',
      date: 'March 22, 2026',
      image: 'assets/images/pic1.jpg'
    },
    {
      id: 3,
      title: 'New Lab Opened',
      description: 'State-of-the-art science lab ready for students to use',
      date: 'March 10, 2026',
      image: 'assets/images/pic5.jpg'
    },
    {
      id: 4,
      title: 'Cambridge Results',
      description: 'Excellent results in Cambridge International Examinations',
      date: 'March 5, 2026',
      image: 'assets/images/pic1.jpg'
    },
    {
      id: 5,
      title: 'Teacher Training',
      description: 'Staff development workshop on modern teaching methods',
      date: 'March 1, 2026',
      image: 'assets/images/pic5.jpg'
    },
    {
      id: 6,
      title: 'Student Achievement',
      description: 'Grade 6 student wins National Mathematics Olympiad',
      date: 'February 28, 2026',
      image: 'assets/images/pic6.jpg'
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
      localStorage.setItem(this.storageKey, JSON.stringify(this.defaultNews));
    }
  }

  getNews(): NewsItem[] {
    // if (typeof localStorage === 'undefined') {
    //   return this.defaultNews;
    // }

    
    if (!this.isBrowser){
        return this.defaultNews
    };
    const data = localStorage.getItem(this.storageKey);
    return data ? JSON.parse(data) : this.defaultNews;
  }

  getNewsById(id: number): NewsItem | undefined {
    return this.getNews().find(item => item.id === id);
  }

  addNews(item: NewsItem): void {
    if(!this.isBrowser) return;
    const news = this.getNews();
    item.id = news.length > 0 ? Math.max(...news.map(n => n.id)) + 1 : 1;
    news.unshift(item);
    localStorage.setItem(this.storageKey, JSON.stringify(news));
  }

  updateNews(id: number, updatedItem: NewsItem): void {
    let news = this.getNews();
    const index = news.findIndex(item => item.id === id);
    if (index !== -1) {
      news[index] = { ...updatedItem, id };
      localStorage.setItem(this.storageKey, JSON.stringify(news));
    }
  }

  deleteNews(id: number): void {
    if(!this.isBrowser) return;
    let news = this.getNews();
    news = news.filter(item => item.id !== id);
    localStorage.setItem(this.storageKey, JSON.stringify(news));
  }
}