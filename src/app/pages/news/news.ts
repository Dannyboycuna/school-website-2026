import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NewsService, NewsItem } from '../../services/news'; 

@Component({
  selector: 'app-news',
  imports: [CommonModule],
  templateUrl: './news.html',
  styleUrls: ['./news.sass']
})
export class News implements OnInit {
  
  newsItems: NewsItem[] = [];

  constructor(private newsService: NewsService) {}

  ngOnInit(): void {
    this.newsItems = this.newsService.getNews();
  }
}