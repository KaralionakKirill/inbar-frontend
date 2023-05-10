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
import { IngredientTypesComponent } from './components/ingredient-types/ingredient-types.component'
import { RecipesComponent } from './components/recipes/recipes.component'
import { InnerPageBannerComponent } from './components/inner-page-banner/inner-page-banner.component'
import { RecipeComponent } from './components/recipe/recipe.component'
import { RegistrationComponent } from './components/registration/registration.component'
import { FormsModule, ReactiveFormsModule } from '@angular/forms'
import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http'
import { AuthInterceptor } from './interceptors/auth/auth.interceptor'
import { UrlInterceptor } from './interceptors/url/url.interceptor'
import { CreateIngredientComponent } from './components/create-ingredient/create-ingredient.component'
import { ImageModule } from 'primeng/image'
import { BrowserAnimationsModule } from '@angular/platform-browser/animations'
import { CalendarModule } from 'primeng/calendar'
import { DropdownModule } from 'primeng/dropdown'
import { ToastModule } from 'primeng/toast'
import { MessageService } from 'primeng/api'
import { IngredientsComponent } from './components/ingredients/ingredients.component'
import { IngredientComponent } from './components/ingredient/ingredient.component'

@NgModule({
  declarations: [
    AppComponent,
    NavbarComponent,
    LoadingComponent,
    FooterComponent,
    HomeComponent,
    NotFoundComponent,
    IngredientTypesComponent,
    RecipesComponent,
    InnerPageBannerComponent,
    RecipeComponent,
    RegistrationComponent,
    CreateIngredientComponent,
    IngredientsComponent,
    IngredientComponent
  ],
  imports: [
    AppRoutingModule,
    BrowserModule,
    BrowserAnimationsModule,
    RouterOutlet,
    NgOptimizedImage,
    RouterLink,
    RouterLinkActive,
    FormsModule,
    HttpClientModule,
    ImageModule,
    CalendarModule,
    DropdownModule,
    ReactiveFormsModule,
    ToastModule
  ],
  providers: [
    MessageService,
    {
      provide: HTTP_INTERCEPTORS,
      useClass: AuthInterceptor,
      multi: true
    },
    {
      provide: HTTP_INTERCEPTORS,
      useClass: UrlInterceptor,
      multi: true
    }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
