import { Routes } from '@angular/router';

import { Home } from './pages/home/home';
import { Admissions } from './pages/admissions/admissions';
import { About } from './pages/about/about';
import { Contact } from './pages/contact/contact';
import { Curricula } from './pages/curricula/curricula';
import { Fees } from './pages/fees/fees';
import { Footer } from './pages/footer/footer';
import { Navbar } from './pages/navbar/navbar';
import { News } from './pages/news/news';
import { Gallery } from './pages/gallery/gallery';
import { Testimonials } from './components/testimonials/testimonials';
import { Admin } from './pages/admin/admin';
import { ExtraLessonsComponent } from './pages/extra-lessons.component/extra-lessons.component';


export const routes: Routes = [

    {path:'', component:Home},
    {path:'about', component:About},
    {path:'admissions', component:Admissions},
    {path:'contact', component:Contact},
    {path:'curricula', component:Curricula},
    {path:'fees', component:Fees},
    {path:'footer', component:Footer},
    {path:'navbar', component:Navbar},
    {path:'news', component:News},
    {path:'gallery', component:Gallery},
    {path:'testimonial', component:Testimonials},
    {path:'admin', component:Admin},
    {path:'extralesson', component:ExtraLessonsComponent}
]