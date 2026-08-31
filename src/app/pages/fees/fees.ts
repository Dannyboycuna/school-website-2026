import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';

@Component({
  imports: [CommonModule, RouterLink],
  selector: 'app-fees',
  styleUrl: './fees.sass',
  templateUrl: './fees.html',
})
export class Fees {}
