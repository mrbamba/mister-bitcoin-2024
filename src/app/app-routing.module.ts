import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomePageComponent } from './pages/home-page/home-page.component';
import { ContactPageComponent } from './pages/contact-page/contact-page.component';
import { StatisticsPageComponent } from './pages/statistics-page/statistics-page.component';
import { PageNotFoundComponent } from './pages/page-not-found/page-not-found.component';
import { ContactDetailsPageComponent } from './pages/contact-details-page/contact-details-page.component';
import { ContactEditPageComponent } from './pages/contact-edit-page/contact-edit-page.component';
import { authGuard } from './guards/auth.guard';
import { LoginPageComponent } from './pages/login-page/login-page.component';
import { contactResolver } from './resolvers/contact.resolver';
import { SignupPageComponent } from './pages/signup-page/signup-page.component';
import { SignupModelDrivenComponent } from './cmps/signup-model-driven/signup-model-driven.component';
import { SignupTemplateDrivenComponent } from './cmps/signup-template-driven/signup-template-driven.component';

const routes: Routes = [
  { 
    path: '', 
    component: HomePageComponent 
  },
  {
    path: 'contacts', 
    component: ContactPageComponent, 
    canActivate: [authGuard], 
    children: [
      { path: 'add', component: ContactEditPageComponent }
    ]
  },
  {
    path: 'contact/:contactId', 
    component: ContactDetailsPageComponent, 
    canActivate: [authGuard], 
    resolve: {contact: contactResolver},
    children: [
      { 
        path: 'edit/:contactId', 
        component: ContactEditPageComponent, 
        resolve: {contact: contactResolver}
      },
    ]
  },
  { 
    path: 'statistics', 
    component: StatisticsPageComponent 
  },
  // {path: '', pathMatch:'full', redirectTo: 'home'},
  { 
    path: 'login', 
    component: LoginPageComponent 
  },  
  { 
    path: 'signup', 
    component: SignupPageComponent ,
    children: [
      {
        path: 'model-driven',
        component: SignupModelDrivenComponent
      },
      {
        path: 'template-driven',
        component: SignupTemplateDrivenComponent
      }
    ]
  },
  { 
    path: '**', 
    component: PageNotFoundComponent 
  },

];

@NgModule({
  imports: [RouterModule.forRoot(routes, { useHash: true })],
  exports: [RouterModule]
})
export class AppRoutingModule { }