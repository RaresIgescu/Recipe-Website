import { Injectable } from '@angular/core';
import { Recipe } from '../interfaces/recipe.interface';
import { HttpClient } from '@angular/common/http';
import { db } from '../db/db';
import { id } from '@instantdb/core';
import { Call } from '@angular/compiler';
import { bindCallback } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class RecipesService {
  
  recipes!: any[];
  readonly API_URL = 'https://dummyjson.com/recipes';
  readonly SYNC_KEY = 'recipe_sync';

  constructor(readonly http: HttpClient) {
  }

  getAllRecipes() {
    return this.http.get<{recipes: Recipe[]}>(this.API_URL);
  }

  
  getRecipe(id: number) {
    return this.http.get(`${this.API_URL}/${id}`);
  }

  addDbRecipes(recipeInput: Omit<Recipe, 'id'>) {
    db.transact(
      db.tx.recipes[id()].update({
        name: recipeInput.name,
        image: recipeInput.image,
        difficulty: recipeInput.difficulty,
        prepTimeMinutes: recipeInput.prepTimeMinutes,
      })
    )//.then(() => {
    //   localStorage.setItem(this.SYNC_KEY, Date.now().toString());
    // });
  }

  // subscribeToSyncEvents(callback: () => void): void {
  //   window.addEventListener('storage', (event) => {
  //     if (event.key === this.SYNC_KEY && event.newValue) {
  //       callback(); 
  //     }
  //   });
  // }
}
