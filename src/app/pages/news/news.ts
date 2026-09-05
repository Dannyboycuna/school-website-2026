import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NewsService } from '../../services/news';
import { NewsModel } from '../../models/news.models';

@Component({
  selector: 'app-news',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './news.html',
  styleUrls: ['./news.sass']
})
export class News implements OnInit {

  getNewsUrl(newsPath: string): string {
    if (!newsPath) return '';
    if (newsPath.startsWith('http')) {
      return newsPath;
    }
    return `http://localhost:3000${newsPath}`;
  }

  allNews: NewsModel[] = [];
  filteredNews: NewsModel[] = [];
  categories: string[] = [];
  selectedCategory: string = 'All';

  constructor(private newsService: NewsService) { }

  ngOnInit(): void {
    this.newsService.getNews().subscribe({
      next: (data) => {
        this.allNews = data;
        this.filteredNews = data;          // set filteredImages only after data arrives
      }
    });
  }
}