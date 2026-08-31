import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';

@Component({
  imports: [CommonModule, RouterLink],
  selector: 'app-about',
  styleUrl: './about.sass',
  templateUrl: './about.html',
})
export class About {}
