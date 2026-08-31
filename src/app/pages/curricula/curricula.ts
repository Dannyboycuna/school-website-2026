import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';

@Component({
  imports: [CommonModule, RouterLink],
  selector: 'app-curricula',
  styleUrl: './curricula.sass',
  templateUrl: './curricula.html',
})
export class Curricula {}
