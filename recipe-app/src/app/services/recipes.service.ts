import { Injectable } from '@angular/core';
import { Recipe } from '../interfaces/recipe.interface';
import { HttpClient } from '@angular/common/http';
import { db } from '../db/db';
import { id } from '@instantdb/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class RecipesService {
  
  recipes!: any[];
  readonly API_URL = 'https://dummyjson.com/recipes';

  constructor(readonly http: HttpClient) {
  }

  getAllRecipes() {
    return this.http.get<{recipes: Recipe[]}>(this.API_URL);
  }

  getDBRecipes(): Observable<Recipe[]> {
    return new Observable((subscriber) => {
      db.subscribeQuery({ recipes: {} }, (resp) => {
        if (resp.error) {
          subscriber.error(resp.error);
        }
        if (resp.data) {
          subscriber.next(resp.data.recipes); 
        }
      });
    });
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
    ).then(() => {
      this.getDBRecipes();
    });
  }
}
