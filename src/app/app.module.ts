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
import { CocktailsComponent } from './components/cocktails/cocktails.component'
import { InnerPageBannerComponent } from './components/inner-page-banner/inner-page-banner.component'
import { CocktailComponent } from './components/cocktail/cocktail.component'
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
import { ProfileComponent } from './components/profile/profile.component'
import { CreateCocktailComponent } from './components/create-cocktail/create-cocktail.component'
import { CheckboxModule } from 'primeng/checkbox'
import { ToggleButtonModule } from 'primeng/togglebutton'
import { RatingModule } from 'primeng/rating'
import { BartendersComponent } from './components/bartenders/bartenders.component'
import { BartenderComponent } from './components/bartender/bartender.component'
import { CocktailListComponent } from './components/cocktail-list/cocktail-list.component'
import {
  CocktailsManagementComponent
} from './components/management/cocktails-management/cocktails-management.component'
import { TableModule } from 'primeng/table'
import { CocktailManagementComponent } from './components/management/cocktail-management/cocktail-management.component'
import {
  IngredientManagementComponent
} from './components/management/ingredient-management/ingredient-management.component'
import {
  IngredientsManagementComponent
} from './components/management/ingredients-management/ingredients-management.component'
import { UsersManagementComponent } from './components/management/users-management/users-management.component'
import { PaginatorModule } from 'primeng/paginator'

@NgModule({
  declarations: [
    AppComponent,
    NavbarComponent,
    LoadingComponent,
    FooterComponent,
    HomeComponent,
    NotFoundComponent,
    CocktailsComponent,
    InnerPageBannerComponent,
    CocktailComponent,
    RegistrationComponent,
    CreateIngredientComponent,
    IngredientsComponent,
    IngredientComponent,
    ProfileComponent,
    CreateCocktailComponent,
    BartendersComponent,
    BartenderComponent,
    CocktailListComponent,
    CocktailsManagementComponent,
    CocktailManagementComponent,
    IngredientManagementComponent,
    IngredientsManagementComponent,
    UsersManagementComponent
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
    ToastModule,
    CheckboxModule,
    ToggleButtonModule,
    RatingModule,
    TableModule,
    PaginatorModule
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
