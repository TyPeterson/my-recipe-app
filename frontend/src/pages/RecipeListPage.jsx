import React, { useState } from 'react';
import { Navigate } from 'react-router-dom';
import { useAuth } from '../hooks/useAuth';
import { useRecipes } from '../hooks/useRecipes';
import Header from '../components/common/Header';
import RecipeCard from '../components/recipes/RecipeCard';
import RecipeDetailsView from '../components/recipes/RecipeDetailsView';

export default function RecipeListPage() {
  const { isAuthenticated } = useAuth();
  const { recipes, error } = useRecipes();
  const [selectedRecipe, setSelectedRecipe] = useState(null);
  const [detailsOpen, setDetailsOpen] = useState(false);

  if (!isAuthenticated) {
    return <Navigate to="/login" />;
  }

  function openDetails(recipe) {
    setSelectedRecipe(recipe);
    setDetailsOpen(true);
  }

  function closeDetails() {
    setDetailsOpen(false);
    setSelectedRecipe(null);
  }

  return (
    <div>
      <Header />
      <main className="container">
        <h2>Your Recipes</h2>
        {error && <div style={{ color: 'red' }}>{error}</div>}
        {Array.isArray(recipes) && recipes.length === 0 && !error && <p>You have no recipes yet.</p>}
        <div
          style={{
            display: 'flex',
            flexWrap: 'wrap',
            gap: '1rem',
            justifyContent: 'center',
          }}
        >
          {Array.isArray(recipes) &&
            recipes.map((recipe) => (
              <RecipeCard key={recipe.id} recipe={recipe} onClick={openDetails} />
            ))}
        </div>
      </main>

      {selectedRecipe && (
        <RecipeDetailsView
          open={detailsOpen}
          onClose={closeDetails}
          recipeId={selectedRecipe.id}
        />
      )}
    </div>
  );
}
