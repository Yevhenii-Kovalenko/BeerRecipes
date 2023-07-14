import axios from 'axios';
import { create } from 'zustand';

const useStore = create((set) => ({
  recipes: [],
  selectedRecipes: [],
  fetchRecipes: async () => {
    try {
      const response = await axios.get('https://api.punkapi.com/v2/beers?page=1&per_page=15');
      const recipes = response.data;
      set({ recipes });
    } catch (error) {
      console.error('Error fetching recipes:', error);
    }
  },
  toggleRecipeSelection: (recipeId) =>
    set((state) => ({
      selectedRecipes: state.selectedRecipes.includes(recipeId)
        ? state.selectedRecipes.filter((id) => id !== recipeId)
        : [...state.selectedRecipes, recipeId],
    })),
  removeSelectedRecipes: () =>
    set(() => ({
      selectedRecipes: [],
    })),
}));

export default useStore;
