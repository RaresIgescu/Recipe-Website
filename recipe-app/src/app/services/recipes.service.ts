import { Injectable } from '@angular/core';
import { Recipe } from '../interfaces/recipe.interface';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root',
})
export class RecipesService {
  recipes: Recipe[] = [
    {
      id: '1',
      name: 'Classic Margherita Pizza',
      image: 'https://cdn.dummyjson.com/recipe-images/1.webp',
      tags: ['Pizza', 'Italian'],
      prepTimeMinutes: 20,
    },
    {
      id: '2',
      name: 'Salad',
      image: 'https://cdn.dummyjson.com/recipe-images/2.webp',
      tags: ['Pizza', 'Italian'],
      prepTimeMinutes: 20,
    },
    {
      id: '3',
      name: 'Cookies',
      image: 'https://cdn.dummyjson.com/recipe-images/3.webp',
      tags: ['Pizza', 'Italian'],
      prepTimeMinutes: 20,
    },
  ];
  readonly API_URL = 'https://dummyjson.com/recipes';

  constructor(readonly http: HttpClient) {
  }

  getAllRecipes() {
    return this.http.get<{recipes: Recipe[]}>(this.API_URL);
  }

  getRecipe(id: number) {
    return this.http.get(`${this.API_URL}/${id}`);
  }
}
