import React from 'react';
import { Link } from 'react-router-dom';

import styles from './Recipe.module.css';

export default function Recipe({ name, tagline, firstBrewed, description, image, id }) {
  return (
    <Link className={styles.recipeLink} to={`/recipe/${id}`}>
      <div className={styles.recipe}>
        <div className={styles.content}>
          <h2>{name}</h2>
          <p>{tagline}</p>
          <p className={styles.contentText}>{firstBrewed}</p>
          <p>{description}</p>
        </div>
        <img className={styles.photo} src={image} alt="beer" />
      </div>
    </Link>
  );
}
