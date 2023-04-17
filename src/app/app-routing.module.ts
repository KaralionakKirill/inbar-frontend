import { NgModule } from '@angular/core'
import { RouterModule, Routes } from '@angular/router'
import { HomeComponent } from './components/home/home.component'
import { NotFoundComponent } from './components/not-found/not-found.component'
import { IngredientsComponent } from './components/category/ingredients.component'
import { RecipesComponent } from './components/recipes/recipes.component'
import { RecipeComponent } from './components/recipe/recipe.component'
import { RegistrationComponent } from './components/registration/registration.component'

const routes: Routes = [
  { path: '', redirectTo: '/home', pathMatch: 'full' },
  { path: 'home', component: HomeComponent },
  { path: 'ingredients', component: IngredientsComponent },
  { path: 'recipes', component: RecipesComponent },
  { path: 'recipes/:id', component: RecipeComponent },
  { path: 'registration', component: RegistrationComponent },
  { path: '**', component: NotFoundComponent },
]

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {
}
