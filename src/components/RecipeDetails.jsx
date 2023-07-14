import React, { useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';

import axios from 'axios';

import styles from './RecipeDetails.module.css';

export default function RecipeDetails() {
  const { id } = useParams();
  const [recipeDetails, setRecipeDetails] = useState(null);

  useEffect(() => {
    const fetchRecipeDetails = async () => {
      try {
        const response = await axios.get(`https://api.punkapi.com/v2/beers/${id}`);
        const details = response.data[0];
        setRecipeDetails(details);
      } catch (error) {
        console.error(error);
      }
    };
    fetchRecipeDetails();
  }, [id]);

  if (!recipeDetails) {
    return <p>Loading...</p>;
  }
  const { name, tagline, description, image_url, abv, ibu, ebc, ph, first_brewed, food_pairing } =
    recipeDetails;

  return (
    <div className={styles.recipeDetail}>
      <div className={styles.recipeDetailHeader}>
        <h2 className={styles.recipeName}>{name}</h2>
        <p className={styles.recipeTagline}>{tagline}</p>
      </div>
      <div className={styles.recipeDetailContent}>
        <div className={styles.recipeImageContainer}>
          <img src={image_url} alt={name} className={styles.recipeImage} />
        </div>
        <div className={styles.recipeInfo}>
          <p className={styles.recipeDescription}>{description}</p>
          <p className={styles.recipeInfoItem}>
            <span className={styles.recipeInfoLabel}>ABV:</span> {abv}%
          </p>
          <p className={styles.recipeInfoItem}>
            <span className={styles.recipeInfoLabel}>IBU:</span> {ibu}
          </p>
          <p className={styles.recipeInfoItem}>
            <span className={styles.recipeInfoLabel}>EBC:</span> {ebc}
          </p>
          <p className={styles.recipeInfoItem}>
            <span className={styles.recipeInfoLabel}>pH:</span> {ph}
          </p>
          <p className={styles.recipeInfoItem}>
            <span className={styles.recipeInfoLabel}>First Brewed:</span> {first_brewed}
          </p>
          <div className={styles.recipeFoodPairing}>
            <p className={styles.recipeInfoLabel}>Food Pairing:</p>
            <ul className={styles.foodPairingList}>
              {food_pairing.map((food, index) => (
                <li key={index}>{food}</li>
              ))}
            </ul>
          </div>
        </div>
      </div>
      <Link to=".." className={styles.backLink}>
        &#8592; Back
      </Link>
    </div>
  );
}
