import React, { useEffect, useRef, useState } from 'react';

import Recipe from './Recipe';
import styles from './RecipeList.module.css';
import useStore from './store';

function RecipeList() {
  const { recipes, fetchRecipes, selectedRecipes, toggleRecipeSelection, removeSelectedRecipes } =
    useStore();
  const [visibleRecipes, setVisibleRecipes] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const recipesPerPage = 5;
  const containerRef = useRef(null);
  const lastRecipeRef = useRef(null);

  const handleObserver = (entries) => {
    const target = entries[0];
    if (target.isIntersecting && currentPage * recipesPerPage < recipes.length) {
      setCurrentPage((prevPage) => prevPage + 1);
    }
  };

  useEffect(() => {
    fetchRecipes();
  }, []);

  useEffect(() => {
    setVisibleRecipes(recipes.slice(0, recipesPerPage));
    setCurrentPage(1);
  }, [recipes]);

  useEffect(() => {
    const observer = new IntersectionObserver(handleObserver, {
      root: null,
      rootMargin: '0px',
      threshold: 1.0,
    });

    if (lastRecipeRef.current) {
      observer.observe(lastRecipeRef.current);
    }

    return () => {
      if (lastRecipeRef.current) {
        observer.unobserve(lastRecipeRef.current);
      }
    };
  }, [visibleRecipes]);

  const handleContextMenu = (e, recipe) => {
    e.preventDefault();
    toggleRecipeSelection(recipe.id);
  };

  useEffect(() => {
    if (currentPage === 1) {
      setVisibleRecipes(recipes.slice(0, recipesPerPage));
    } else {
      const startIndex = (currentPage - 1) * recipesPerPage;
      const endIndex = startIndex + recipesPerPage;
      setVisibleRecipes((prevRecipes) => [...prevRecipes, ...recipes.slice(startIndex, endIndex)]);
    }
  }, [recipes, currentPage]);

  if (recipes.length === 0) {
    return <p className={styles.loading}>Loading...</p>;
  }

  return (
    <div className={styles.recipeList} ref={containerRef}>
      <h1>Beer Recipes</h1>
      <ul>
        {visibleRecipes.map((recipe, index) => (
          <div
            key={recipe.id}
            onContextMenu={(e) => handleContextMenu(e, recipe)}
            style={{
              background: selectedRecipes.includes(recipe.id) ? 'lightblue' : 'transparent',
              color: selectedRecipes.includes(recipe.id) ? 'black' : 'white',
              borderRadius: selectedRecipes.includes(recipe.id) ? '10px' : '',
            }}
            ref={index === visibleRecipes.length - 1 ? lastRecipeRef : null}
          >
            <Recipe
              name={recipe.name}
              tagline={recipe.tagline}
              firstBrewed={recipe.first_brewed}
              description={recipe.description}
              image={recipe.image_url}
              id={recipe.id}
            />
          </div>
        ))}
      </ul>
      {selectedRecipes.length > 0 && (
        <button className={styles.btn} onClick={() => removeSelectedRecipes()} type="button">
          Remove
        </button>
      )}
    </div>
  );
}

export default RecipeList;
