import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { NewsService } from '../../services/news';
import { NewsModel } from '../../models/news.models';
import { GalleryService } from '../../services/gallery';
import { GalleryModel } from '../../models/gallery.models';
import { TestimonialsService } from '../../services/testimonials';
import { TestimonialModel } from '../../models/testimonial.models';
import { AboutModel } from '../../models/about.models';
import { AboutService } from '../../services/aboutService';
import { StudentModel } from '../../models/student.models';
import { StudentService } from '../../services/studentService';
import { FeeModel } from '../../models/fee.models';
import { FeesService } from '../../services/feesService';

@Component({
  imports: [CommonModule, FormsModule],
  selector: 'app-admin',
  styleUrl: './admin.sass',
  templateUrl: './admin.html',
})
export class Admin {

  activeTab: string = 'News';
  tabs: string[] = ['News', 'Gallery', 'Testimonials', 'About', 'Student', 'Fees'];

  // ===== NEWS =====
  newsList: NewsModel[] = [];
  newNews: NewsModel = {
    id: 0,
    title: '',
    description: '',
    date: '',
    image: ''
  };
  newNewsFile: File | null = null;

  // ===== GALLERY =====
  galleryList: GalleryModel[] = [];
  newGallery: GalleryModel = {
    id: 0,
    title: '',
    image: '',
    category: ''
  };
  newGalleryFile: File | null = null;

  // ===== TESTIMONIALS =====
  testimonialsList: TestimonialModel[] = [];
  newTestimonial: TestimonialModel = {
    id: 0,
    name: '',
    role: '',
    text: '',
    image: ''
  };
  newTestimonialFile: File | null = null;

  // ===== ABOUT =====
  aboutList: AboutModel[] = [];
  aboutData: AboutModel = {
    id: 0,
    mission: '',
    vision: '',
    values: '',
    campus_image: ''
  };
  newAbout: AboutModel = {
    id: 0,
    mission: '',
    vision: '',
    values: '',
    campus_image: ''
  };
  newAboutFile: File | null = null;
  editingAboutId: number | null = null;

  // ===== STUDENT =====
  studentList: StudentModel[] = [];
  newStudent: StudentModel = {
    id: 0,
    name: '',
    grade: '',
    description: '',
    image: '',
    is_featured: true
  };
  newStudentFile: File | null = null;
  editingStudentId: number | null = null;
  editStudentForm: StudentModel = {
    id: 0,
    name: '',
    grade: '',
    description: '',
    image: '',
    is_featured: true
  };

  // ===== FEES =====
  feesList: FeeModel[] = [];
  newFee: FeeModel = {
    id: 0,
    grade_level: '',
    curriculum: '',
    amount: 0,
    currency: ''
  };
  editFeeForm: FeeModel = {
    id: 0,
    grade_level: '',
    curriculum: '',
    amount: 0,
    currency: ''
  };
  editingFeeId: number | null = null;

  constructor(
    private newsService: NewsService,
    private galleryService: GalleryService,
    private testimonialsService: TestimonialsService,
    private feesService: FeesService,
    private aboutService: AboutService,
    private studentService: StudentService
  ) {
    this.loadAllData();
  }

  setActiveTab(tab: string): void {
    this.activeTab = tab;
    console.log('Active tab:', this.activeTab);
  }

  getTabIcon(tab: string): string {
    switch (tab) {
      case 'News': return 'fas fa-newspaper';
      case 'Gallery': return 'fas fa-images';
      case 'Testimonials': return 'fas fa-star';
      default: return 'fas fa-cog';
    }
  }

  // ============================================
  // ===== NEWS (DON'T MODIFY - SAMPLE) =====
  // ============================================
  private reloadNews(): void {
    this.newsService.getNews().subscribe({
      next: (data) => this.newsList = data,
      error: (err) => console.error(err)
    });
  }

  onNewsFileSelected(event: any): void {
    const file = event.target.files[0];
    if (file) {
      this.newNewsFile = file;
      const reader = new FileReader();
      reader.onload = (e: any) => {
        this.newNews.image = e.target.result;
      };
      reader.readAsDataURL(file);
    }
  }

  addNews(): void {
    if (!this.newNews.title || !this.newNews.description || !this.newNews.date || !this.newNewsFile) {
      alert('Please fill all fields and upload an image');
      return;
    }

    const formData = new FormData();
    formData.append('title', this.newNews.title);
    formData.append('description', this.newNews.description);
    formData.append('date', this.newNews.date);
    formData.append('image', this.newNewsFile);

    this.newsService.addNews(formData).subscribe({
      next: () => {
        this.reloadNews();
        this.newNews = { id: 0, title: '', description: '', date: '', image: '' };
        this.newNewsFile = null;
        alert('News added successfully!');
      },
      error: (err) => {
        console.error(err);
        alert('Failed to add News');
      }
    });
  }

  deleteNews(id: number): void {
    if (confirm('Are you sure you want to delete this news?')) {
      this.newsService.deleteNews(id).subscribe({
        next: () => {
          this.reloadNews();
          alert('News deleted successfully!');
        },
        error: (err) => {
          console.error(err);
          alert('Failed to delete news');
        }
      });
    }
  }

  // ============================================
  // ===== GALLERY (DON'T MODIFY - SAMPLE) =====
  // ============================================
  private reloadGallery(): void {
    this.galleryService.getAllImages().subscribe({
      next: (data) => this.galleryList = data,
      error: (err) => console.error(err)
    });
  }

  onGalleryFileSelected(event: any): void {
    const file = event.target.files[0];
    if (file) {
      this.newGalleryFile = file;
      const reader = new FileReader();
      reader.onload = (e: any) => {
        this.newGallery.image = e.target.result;
      };
      reader.readAsDataURL(file);
    }
  }

  addGalleryImage(): void {
    if (!this.newGallery.title || !this.newGallery.category || !this.newGalleryFile) {
      alert('Please fill all fields and upload an image');
      return;
    }

    const formData = new FormData();
    formData.append('title', this.newGallery.title);
    formData.append('category', this.newGallery.category);
    formData.append('image', this.newGalleryFile);

    this.galleryService.addImage(formData).subscribe({
      next: () => {
        this.reloadGallery();
        this.newGallery = { id: 0, title: '', image: '', category: '' };
        this.newGalleryFile = null;
        alert('Image added successfully!');
      },
      error: (err) => {
        console.error(err);
        alert('Failed to add image');
      }
    });
  }

  deleteGalleryImage(id: number): void {
    if (confirm('Are you sure you want to delete this image?')) {
      this.galleryService.deleteImage(id).subscribe({
        next: () => {
          this.reloadGallery();
          alert('Image deleted successfully!');
        },
        error: (err) => {
          console.error(err);
          alert('Failed to delete image');
        }
      });
    }
  }

  // ============================================
  // ===== TESTIMONIALS (DON'T MODIFY - SAMPLE) =====
  // ============================================
  private reloadTestimonials(): void {
    this.testimonialsService.getAllTestimonials().subscribe({
      next: (data) => this.testimonialsList = data,
      error: (err) => console.error(err)
    });
  }

  onTestimonialFileSelected(event: any): void {
    const file = event.target.files[0];
    if (file) {
      this.newTestimonialFile = file;
      const reader = new FileReader();
      reader.onload = (e: any) => {
        this.newTestimonial.image = e.target.result;
      };
      reader.readAsDataURL(file);
    }
  }

  addTestimonial(): void {
    if (!this.newTestimonial.name || !this.newTestimonial.role || !this.newTestimonial.text || !this.newTestimonialFile) {
      alert('Please fill all fields and upload an image');
      return;
    }

    const formData = new FormData();
    formData.append('name', this.newTestimonial.name);
    formData.append('role', this.newTestimonial.role);
    formData.append('text', this.newTestimonial.text);
    formData.append('image', this.newTestimonialFile);

    this.testimonialsService.addTestimonial(formData).subscribe({
      next: () => {
        this.reloadTestimonials();
        this.newTestimonial = { id: 0, name: '', role: '', text: '', image: '' };
        this.newTestimonialFile = null;
        alert('Testimonial added successfully!');
      },
      error: (err) => {
        console.error(err);
        alert('Failed to add testimonial');
      }
    });
  }

  deleteTestimonial(id: number): void {
    if (confirm('Are you sure you want to delete this testimonial?')) {
      this.testimonialsService.deleteTestimonial(id).subscribe({
        next: () => {
          this.reloadTestimonials();
          alert('Testimonial deleted successfully!');
        },
        error: (err) => {
          console.error(err);
          alert('Failed to delete testimonial');
        }
      });
    }
  }

  // ============================================
  // ===== ABOUT (USING SAME PATTERN) =====
  // ============================================
  private reloadAbout(): void {
    this.aboutService.getAllAbout().subscribe({
      next: (data) => {
        this.aboutList = data;
        if (data && data.length > 0) {
          this.aboutData = { ...data[0] };
        }
      },
      error: (err) => console.error(err)
    });
  }

  onAboutFileSelected(event: any): void {
    const file = event.target.files[0];
    if (file) {
      this.newAboutFile = file;
      const reader = new FileReader();
      reader.onload = (e: any) => {
        this.newAbout.campus_image = e.target.result;
        this.aboutData.campus_image = e.target.result;
      };
      reader.readAsDataURL(file);
    }
  }

  addAbout(): void {
    if (!this.newAbout.mission || !this.newAbout.vision || !this.newAbout.values) {
      alert('Please fill all fields');
      return;
    }

    const formData = new FormData();
    formData.append('mission', this.newAbout.mission);
    formData.append('vision', this.newAbout.vision);
    formData.append('values', this.newAbout.values);
    if (this.newAboutFile) {
      formData.append('campus_image', this.newAboutFile);
    }

    this.aboutService.addAbout(formData).subscribe({
      next: () => {
        this.reloadAbout();
        this.newAbout = { id: 0, mission: '', vision: '', values: '', campus_image: '' };
        this.newAboutFile = null;
        alert('About section added successfully!');
      },
      error: (err) => {
        console.error(err);
        alert('Failed to add about section');
      }
    });
  }

  updateAbout(): void {
    if (!this.aboutData.mission || !this.aboutData.vision || !this.aboutData.values) {
      alert('Please fill all fields');
      return;
    }

    const formData = new FormData();
    formData.append('mission', this.aboutData.mission);
    formData.append('vision', this.aboutData.vision);
    formData.append('values', this.aboutData.values);
    if (this.newAboutFile) {
      formData.append('campus_image', this.newAboutFile);
    }

    this.aboutService.updateAbout(this.aboutData.id, formData).subscribe({
      next: () => {
        this.reloadAbout();
        alert('About section updated successfully!');
      },
      error: (err) => {
        console.error(err);
        alert('Failed to update about section');
      }
    });
  }

  deleteAbout(id: number): void {
    if (confirm('Are you sure you want to delete this about section?')) {
      this.aboutService.deleteAbout(id).subscribe({
        next: () => {
          this.reloadAbout();
          alert('About section deleted successfully!');
        },
        error: (err) => {
          console.error(err);
          alert('Failed to delete about section');
        }
      });
    }
  }

  // ============================================
  // ===== STUDENT (USING SAME PATTERN) =====
  // ============================================
  private reloadStudents(): void {
    this.studentService.getAllStudents().subscribe({
      next: (data) => this.studentList = data,
      error: (err) => console.error(err)
    });
  }

  onStudentFileSelected(event: any): void {
    const file = event.target.files[0];
    if (file) {
      this.newStudentFile = file;
      const reader = new FileReader();
      reader.onload = (e: any) => {
        this.newStudent.image = e.target.result;
      };
      reader.readAsDataURL(file);
    }
  }

  addStudent(): void {
    if (!this.newStudent.name || !this.newStudent.grade || !this.newStudent.description || !this.newStudentFile) {
      alert('Please fill all fields and upload an image');
      return;
    }

    const formData = new FormData();
    formData.append('name', this.newStudent.name);
    formData.append('grade', this.newStudent.grade);
    formData.append('description', this.newStudent.description);
    formData.append('image', this.newStudentFile);
    formData.append('is_featured', String(this.newStudent.is_featured));

    this.studentService.addStudent(formData).subscribe({
      next: () => {
        this.reloadStudents();
        this.newStudent = { id: 0, name: '', grade: '', description: '', image: '', is_featured: true };
        this.newStudentFile = null;
        alert('Student added successfully!');
      },
      error: (err) => {
        console.error(err);
        alert('Failed to add student');
      }
    });
  }

  startEditStudent(student: StudentModel): void {
    this.editingStudentId = student.id;
    this.editStudentForm = { ...student };
  }

  updateStudent(): void {
    if (!this.editStudentForm.name || !this.editStudentForm.grade || !this.editStudentForm.description) {
      alert('Please fill all fields');
      return;
    }

    this.studentService.updateStudent(this.editingStudentId!, this.editStudentForm).subscribe({
      next: () => {
        this.reloadStudents();
        this.cancelEditStudent();
        alert('Student updated successfully!');
      },
      error: (err) => {
        console.error(err);
        alert('Failed to update student');
      }
    });
  }

  cancelEditStudent(): void {
    this.editingStudentId = null;
    this.editStudentForm = { id: 0, name: '', grade: '', description: '', image: '', is_featured: true };
  }

  deleteStudent(id: number): void {
    if (confirm('Are you sure you want to delete this student?')) {
      this.studentService.deleteStudent(id).subscribe({
        next: () => {
          this.reloadStudents();
          alert('Student deleted successfully!');
        },
        error: (err) => {
          console.error(err);
          alert('Failed to delete student');
        }
      });
    }
  }

  // ============================================
  // ===== FEES (USING SAME PATTERN) =====
  // ============================================
  private reloadFees(): void {
    this.feesService.getAllFees().subscribe({
      next: (data) => this.feesList = data,
      error: (err) => console.error(err)
    });
  }

  addFee(): void {
    if (!this.newFee.grade_level || !this.newFee.curriculum || !this.newFee.amount || !this.newFee.currency) {
      alert('Please fill all fields');
      return;
    }

    this.feesService.addFee(this.newFee).subscribe({
      next: () => {
        this.reloadFees();
        this.newFee = { id: 0, grade_level: '', curriculum: '', amount: 0, currency: '' };
        alert('Fee added successfully!');
      },
      error: (err) => {
        console.error(err);
        alert('Failed to add fee');
      }
    });
  }

  startEditFee(fee: FeeModel): void {
    this.editingFeeId = fee.id;
    this.editFeeForm = { ...fee };
  }

  updateFee(id:number): void {
    if (!this.editFeeForm.grade_level || !this.editFeeForm.curriculum || !this.editFeeForm.amount || !this.editFeeForm.currency) {
      alert('Please fill all fields');
      return;
    }

    this.feesService.updateFee(this.editingFeeId!, this.editFeeForm).subscribe({
      next: () => {
        this.reloadFees();
        this.cancelEditFee();
        alert('Fee updated successfully!');
      },
      error: (err) => {
        console.error(err);
        alert('Failed to update fee');
      }
    });
  }

  cancelEditFee(): void {
    this.editingFeeId = null;
    this.editFeeForm = { id: 0, grade_level: '', curriculum: '', amount: 0, currency: '' };
  }

  deleteFee(id: number): void {
    if (confirm('Are you sure you want to delete this fee?')) {
      this.feesService.deleteFee(id).subscribe({
        next: () => {
          this.reloadFees();
          alert('Fee deleted successfully!');
        },
        error: (err) => {
          console.error(err);
          alert('Failed to delete fee');
        }
      });
    }
  }

  formatCurrency(amount: number): string {
    return amount ? amount.toFixed(2) : '0.00';
  }

  // ============================================
  // ===== LOAD ALL DATA =====
  // ============================================
  loadAllData(): void {
    this.reloadNews();
    this.reloadGallery();
    this.reloadTestimonials();
    this.reloadAbout();
    this.reloadStudents();
    this.reloadFees();
  }
}