import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';

@Component({
  imports: [CommonModule, RouterLink],
  selector: 'app-admissions',
  styleUrl: './admissions.sass',
  templateUrl: './admissions.html',
})
export class Admissions {}
