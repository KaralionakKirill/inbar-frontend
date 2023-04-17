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
import { IngredientsComponent } from './components/category/ingredients.component'
import { RecipesComponent } from './components/recipes/recipes.component'
import { InnerPageBannerComponent } from './components/inner-page-banner/inner-page-banner.component'
import { RecipeComponent } from './components/recipe/recipe.component'
import { RegistrationComponent } from './components/registration/registration.component'

@NgModule({
  declarations: [
    AppComponent,
    NavbarComponent,
    LoadingComponent,
    FooterComponent,
    HomeComponent,
    NotFoundComponent,
    IngredientsComponent,
    RecipesComponent,
    InnerPageBannerComponent,
    RecipeComponent,
    RegistrationComponent
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
