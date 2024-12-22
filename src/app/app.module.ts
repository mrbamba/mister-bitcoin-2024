import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app-root/app.component';
import { HomePageComponent } from './pages/home-page/home-page.component';
import { ContactPageComponent } from './pages/contact-page/contact-page.component';
import { ContactDetailsPageComponent } from './pages/contact-details-page/contact-details-page.component';
import { StatisticsPageComponent } from './pages/statistics-page/statistics-page.component';
import { ContactPreviewComponent } from './cmps/contact-preview/contact-preview.component';
import { ContactListComponent } from './cmps/contact-list/contact-list.component';
import { ContactFilterComponent } from './cmps/contact-filter/contact-filter.component';
import { provideHttpClient } from '@angular/common/http';

// --------------Chart imports:
import { NgxEchartsModule } from 'ngx-echarts';
import * as echarts from 'echarts/core';
import { BarChart } from 'echarts/charts';
import { GridComponent } from 'echarts/components';
import { CanvasRenderer } from 'echarts/renderers';
import { FormsModule } from '@angular/forms';
import { ContactEditPageComponent } from './pages/contact-edit-page/contact-edit-page.component';
import { LoginPageComponent } from './pages/login-page/login-page.component';
import { SignupPageComponent } from './pages/signup-page/signup-page.component';
import { LoaderComponent } from './cmps/loader/loader.component';
import { SignupTemplateDrivenComponent } from './cmps/signup-template-driven/signup-template-driven.component';
import { SignupModelDrivenComponent } from './cmps/signup-model-driven/signup-model-driven.component';
echarts.use([BarChart, GridComponent, CanvasRenderer]);
// --------------End chart imports

@NgModule({
  declarations: [
    AppComponent,
    HomePageComponent,
    ContactPageComponent,
    ContactDetailsPageComponent,
    StatisticsPageComponent,
    ContactPreviewComponent,
    ContactListComponent,
    ContactFilterComponent,
    ContactEditPageComponent,
    LoginPageComponent,
    SignupPageComponent,
    LoaderComponent,
    SignupTemplateDrivenComponent,
    SignupModelDrivenComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    NgxEchartsModule.forRoot({ echarts }),
    FormsModule
  ],
  providers: [provideHttpClient()],
  bootstrap: [AppComponent]
})
export class AppModule { }
