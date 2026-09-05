// import { CommonModule } from '@angular/common';
// import { Component } from '@angular/core';
// import { FormsModule } from '@angular/forms';
// import { NewsService } from '../../services/news';
// import { NewsModel } from '../../models/news.models';
// import { GalleryService } from '../../services/gallery';
// import { GalleryModel } from '../../models/gallery.models';
// import { TestimonialsService } from '../../services/testimonials';
// import { TestimonialModel } from '../../models/testimonial.models';
// import { AboutModel } from '../../models/about.models';
// import { AboutService } from '../../services/aboutService';
// import { StudentModel } from '../../models/student.models';
// import { StudentService } from '../../services/studentService';
// import { FeeModel } from '../../models/fee.models';
// import { FeesService } from '../../services/feesService';

// @Component({
//   imports: [CommonModule, FormsModule],
//   selector: 'app-admin',
//   styleUrl: './admin.sass',
//   templateUrl: './admin.html',
// })
// export class Admin {

//   activeTab: string = 'News';
//   tabs: string[] = ['News', 'Gallery', 'Testimonials', 'About', 'Student', 'Fees'];

//   newsList: NewsModel[] = [];
//   newNews: NewsModel = {
//     id: 0,
//     title: '',
//     description: '',
//     date: '',
//     image: ''
//   };
//   // Add this for file upload
//   newNewsFile: File | null = null;

//   galleryList: GalleryModel[] = [];
//   newGallery: GalleryModel = {
//     id: 0,
//     title: '',
//     image: '',
//     category: ''
//   };
//   // Add this for file upload
//   newGalleryFile: File | null = null;

//   testimonialsList: TestimonialModel[] = [];
//   newTestimonial: TestimonialModel = {
//     id: 0,
//     name: '',
//     role: '',
//     text: '',
//     image: ''
//   };
//   // Add this for file upload
//   newTestimonialFile: File | null = null;


//   // about
//   aboutList: AboutModel[] = [];
//   about: AboutModel = {
//     id: 0,
//     mission: '',
//     vision: '',
//     values: '',
//     campus_image: ''
//   };
//   newAboutFile: File | null = null;

//   // Student
//   studentList: StudentModel[] = [];
//   student: StudentModel = {
//     id: 0,
//     name: '',
//     grade: '',
//     description: '',
//     image: '',
//     is_featured: true
//   };
//   newSTudentFile: File | null = null;

//   // Fee
//   feesList: FeeModel[] = [];
//   fees: FeeModel = {
//     id: 0,
//     currency: '',
//     curriculum: '',
//     grade_level: '',
//     amount: 0
//   };
//   newfeeFile: File | null = null;



//   constructor(
//     private newsService: NewsService,
//     private galleryService: GalleryService,
//     private testimonialsService: TestimonialsService,
//     private feesService: FeesService,
//     private aboutService: AboutService,
//     private studentService: StudentService
//   ) {
//     this.loadAllData();
//   }



//   setActiveTab(tab: string): void {
//     this.activeTab = tab;
//     console.log('Active tab:', this.activeTab);
//   }

//   // Handle file selection for News
//   onNewsFileSelected(event: any): void {
//     const file = event.target.files[0];
//     if (file) {
//       this.newNewsFile = file;
//       // Convert to base64 for preview
//       const reader = new FileReader();
//       reader.onload = (e: any) => {
//         this.newNews.image = e.target.result;
//       };
//       reader.readAsDataURL(file);
//     }
//   }

//   // Handle file selection for Gallery
//   onGalleryFileSelected(event: any): void {
//     const file = event.target.files[0];
//     if (file) {
//       this.newGalleryFile = file;
//       const reader = new FileReader();
//       reader.onload = (e: any) => {
//         this.newGallery.image = e.target.result;
//       };
//       reader.readAsDataURL(file);
//     }
//   }

//   // Handle file selection for Testimonials
//   onTestimonialFileSelected(event: any): void {
//     const file = event.target.files[0];
//     if (file) {
//       this.newTestimonialFile = file;
//       const reader = new FileReader();
//       reader.onload = (e: any) => {
//         this.newTestimonial.image = e.target.result;
//       };
//       reader.readAsDataURL(file);
//     }
//   }


//   // Handle file selection for Testimonials
//   onStudentFileSelected(event: any): void {
//     const file = event.target.files[0];
//     if (file) {
//       this.newStudentFile = file;
//       const reader = new FileReader();
//       reader.onload = (e: any) => {
//         this.newStudent.image = e.target.result;
//       };
//       reader.readAsDataURL(file);
//     }
//   }
//   ///////////////////
//   // ========== GALLERY ==========
//   private reloadGallery(): void {
//     this.galleryService.getAllImages().subscribe({
//       next: (data) => this.galleryList = data,
//       error: (err) => console.error(err)
//     });
//   }

//   addGalleryImage(): void {
//     if (!this.newGallery.title || !this.newGallery.category || !this.newGalleryFile) {
//       alert('Please fill all fields and upload an image');
//       return;
//     }

//     const formData = new FormData();
//     formData.append('title', this.newGallery.title);
//     formData.append('category', this.newGallery.category);
//     formData.append('image', this.newGalleryFile);

//     this.galleryService.addImage(formData).subscribe({
//       next: () => {
//         this.reloadGallery();
//         this.newGallery = { id: 0, title: '', image: '', category: '' };
//         this.newGalleryFile = null;
//         alert('Image added successfully!');
//       },
//       error: (err) => {
//         console.error(err);
//         alert('Failed to add image');
//       }
//     });
//   }

//   deleteGalleryImage(id: number): void {
//     if (confirm('Are you sure you want to delete this image?')) {
//       this.galleryService.deleteImage(id).subscribe({
//         next: () => {
//           this.reloadGallery();
//           alert('Image deleted successfully!');
//         },
//         error: (err) => {
//           console.error(err);
//           alert('Failed to delete image');
//         }
//       });
//     }
//   }

//   // ========== NEWS ==========
//   private reloadNews(): void {
//     this.newsService.getNews().subscribe({
//       next: (data) => this.newsList = data,
//       error: (err) => console.error(err)
//     });
//   }

//   addNews(): void {
//     if (!this.newNews.title || !this.newNews.description || !this.newNews.date || !this.newNewsFile) {
//       alert('Please fill all fields and upload an image');
//       return;
//     }

//     const formData = new FormData();
//     formData.append('title', this.newNews.title);
//     formData.append('description', this.newNews.description);
//     formData.append('date', this.newNews.date);
//     formData.append('image', this.newNewsFile);

//     this.newsService.addNews(formData).subscribe({
//       next: () => {
//         this.reloadNews();
//         this.newNews = { id: 0, title: '', description: '', date: '', image: '' };
//         this.newNewsFile = null;
//         this.reloadNews();
//         alert('News added successfully!');
//         this.reloadNews();
//       },
//       error: (err) => {
//         console.error(err);
//         alert('Failed to add News');
//       }
//     });
//   }

//   deleteNews(id: number): void {
//     if (confirm('Are you sure you want to delete this news?')) {
//       this.newsService.deleteNews(id).subscribe({
//         next: () => {
//           this.reloadNews();
//           alert('News deleted successfully!');
//         },
//         error: (err) => {
//           console.error(err);
//           alert('Failed to delete news');
//         }
//       });
//     }
//   }


//   // ========== TESTIMONIALS ==========
//   private reloadTestimonials(): void {
//     this.testimonialsService.getAllTestimonials().subscribe({
//       next: (data) => this.testimonialsList = data,
//       error: (err) => console.error(err)
//     });
//   }

//   addTestimonial(): void {
//     if (!this.newTestimonial.name || !this.newTestimonial.role || !this.newTestimonial.text || !this.newTestimonialFile) {
//       alert('Please fill all fields and upload an image');
//       return;
//     }

//     const formData = new FormData();
//     formData.append('name', this.newTestimonial.name);
//     formData.append('role', this.newTestimonial.role);
//     formData.append('text', this.newTestimonial.text);
//     formData.append('image', this.newTestimonialFile);

//     this.testimonialsService.addTestimonial(formData).subscribe({
//       next: () => {
//         this.reloadTestimonials();
//         this.newTestimonial = { id: 0, name: '', role: '', text: '', image: '' };
//         this.newTestimonialFile = null;
//         alert('Testimonial added successfully!');
//       },
//       error: (err) => {
//         console.error(err);
//         alert('Failed to add testimonial');
//       }
//     });
//   }

//   deleteTestimonial(id: number): void {
//     if (confirm('Are you sure you want to delete this testimonial?')) {
//       this.testimonialsService.deleteTestimonial(id).subscribe({
//         next: () => {
//           this.reloadTestimonials();
//           alert('Testimonial deleted successfully!');
//         },
//         error: (err) => {
//           console.error(err);
//           alert('Failed to delete testimonial');
//         }
//       });
//     }
//   }}
