import { CommonModule } from '@angular/common';
import { Component, NgModule, signal } from '@angular/core';
import { RouterOutlet } from '@angular/router'
import { Navbar } from './pages/navbar/navbar';
import { Footer } from './pages/footer/footer';
import { Testimonials } from './components/testimonials/testimonials';
import { Admin } from './pages/admin/admin';
import { ExtraLessonsComponent } from './pages/extra-lessons.component/extra-lessons.component';

@Component({
  imports: [RouterOutlet, CommonModule, Navbar, Footer, Testimonials, Admin, ExtraLessonsComponent],
  selector: 'app-root',
  styleUrl: './app.sass', 
  templateUrl: './app.html',
})
export class App {
  // protected readonly title = signal('getStarted');
  title: string = 'School Website'
}
