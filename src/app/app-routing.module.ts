import { NgModule } from '@angular/core'
import { RouterModule, Routes } from '@angular/router'
import { HomeComponent } from './components/home/home.component'
import { NotFoundComponent } from './components/not-found/not-found.component'
import { IngredientTypesComponent } from './components/ingredient-types/ingredient-types.component'
import { RecipesComponent } from './components/recipes/recipes.component'
import { RecipeComponent } from './components/recipe/recipe.component'
import { RegistrationComponent } from './components/registration/registration.component'
import { CreateIngredientComponent } from './components/create-ingredient/create-ingredient.component'
import { IngredientsComponent } from './components/ingredients/ingredients.component'
import { IngredientComponent } from './components/ingredient/ingredient.component'
import { IngredientResolverService } from './resolvers/ingredient/ingredient-resolver.service'
import { ProfileComponent } from './components/profile/profile.component'
import { UserResolverService } from './resolvers/user/user-resolver.service'
import { CreateCocktailComponent } from './components/create-cocktail/create-cocktail.component'

const routes: Routes = [
  { path: '', redirectTo: '/home', pathMatch: 'full' },
  { path: 'home', component: HomeComponent },
  { path: 'ingredient-types', component: IngredientTypesComponent },
  { path: 'ingredients', component: IngredientsComponent },
  { path: 'ingredients/:id', component: IngredientComponent, resolve: { ingredientInfo: IngredientResolverService } },
  { path: 'recipes', component: RecipesComponent },
  { path: 'recipes/:id', component: RecipeComponent },
  { path: 'registration', component: RegistrationComponent },
  { path: 'create/ingredient', component: CreateIngredientComponent },
  { path: 'create/cocktail', component: CreateCocktailComponent },
  { path: 'profile', component: ProfileComponent, resolve: { userInfo: UserResolverService } },
  { path: '**', component: NotFoundComponent },
]

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {
}
