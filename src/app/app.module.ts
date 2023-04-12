import { NgModule } from '@angular/core'
import { BrowserModule } from '@angular/platform-browser'

import { AppComponent } from './app.component'
import { RouterLink, RouterLinkActive, RouterOutlet } from '@angular/router'
import { NavbarComponent } from './components/navbar/navbar.component'
import { LoadingComponent } from './components/loading/loading.component'
import { NgOptimizedImage } from '@angular/common'
import { FooterComponent } from './components/footer/footer.component'
import { HomeComponent } from './components/home/home.component'
import { AppRoutingModule } from './app-routing.module'
import { NotFoundComponent } from './components/not-found/not-found.component'
import { CategoryComponent } from './components/category/category.component'

@NgModule({
  declarations: [
    AppComponent,
    NavbarComponent,
    LoadingComponent,
    FooterComponent,
    HomeComponent,
    NotFoundComponent,
    CategoryComponent
  ],
  imports: [
    AppRoutingModule,
    BrowserModule,
    RouterOutlet,
    NgOptimizedImage,
    RouterLink,
    RouterLinkActive
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
