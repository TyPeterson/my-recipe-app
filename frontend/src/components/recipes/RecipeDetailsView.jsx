import React, { useState, useEffect } from 'react';
import Modal from '../common/Modal';
import { useAuth } from '../../hooks/useAuth';
import { getRecipeById } from '../../api/recipes';
import { addIngredient, updateIngredient, deleteIngredient } from '../../api/ingredients';
import IngredientItem from './IngredientItem';
import IngredientForm from './IngredientForm';
import IngredientEditor from './IngredientEditor';

export default function RecipeDetailsView({ recipeId, open, onClose }) {
  const { token } = useAuth();
  const [recipe, setRecipe] = useState(null); // Recipe object
  const [error, setError] = useState(null); // Error state
  const [loading, setLoading] = useState(false); // Loading state
  const [editingIngredient, setEditingIngredient] = useState(null); // Editing state

  // Fetch recipe details when modal opens
  useEffect(() => {
    if (open && recipeId && token) {
      fetchRecipe();
    }
  }, [open, recipeId, token]);

  async function fetchRecipe() {
    try {
      setLoading(true);
      const data = await getRecipeById(token, recipeId);
      console.log('Fetched recipe:', data); // Debugging: Check the structure of the recipe
      setRecipe(data.recipe);
      setError(null);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  }

  async function handleAddIngredient({ name, quantity }) {
    try {
      const data = await addIngredient(token, recipeId, name, quantity);
      setRecipe((prev) => ({
        ...prev,
        ingredients: [...(prev.ingredients || []), data.ingredient],
      }));
    } catch (err) {
      alert(err.message);
    }
  }

  async function handleEditIngredient(updated) {
    try {
      const data = await updateIngredient(token, updated.id, {
        name: updated.name,
        quantity: updated.quantity,
      });
      setRecipe((prev) => ({
        ...prev,
        ingredients: (prev.ingredients || []).map((i) =>
          i.id === updated.id ? data.ingredient : i
        ),
      }));
      setEditingIngredient(null);
    } catch (err) {
      alert(err.message);
    }
  }

  async function handleDeleteIngredient(ingredient) {
    if (!window.confirm('Delete this ingredient?')) return;
    try {
      await deleteIngredient(token, ingredient.id);
      setRecipe((prev) => ({
        ...prev,
        ingredients: (prev.ingredients || []).filter((i) => i.id !== ingredient.id),
      }));
    } catch (err) {
      alert(err.message);
    }
  }

  return (
    <Modal open={open} onClose={onClose}>
      {loading && <p>Loading...</p>}
      {error && <div style={{ color: 'red' }}>{error}</div>}
      {recipe ? (
        <div>
          <h2>{recipe.title}</h2>
          <p>
            <strong>Instructions:</strong> {recipe.instructions || 'No instructions provided.'}
          </p>
          <h3>Ingredients</h3>
          {(recipe.ingredients?.length || 0) === 0 && <p>No ingredients yet.</p>}
          <ul>
            {(recipe.ingredients || []).map((ing) =>
              ing.id === editingIngredient?.id ? (
                <IngredientEditor
                  key={ing.id}
                  ingredient={ing}
                  onSave={handleEditIngredient}
                  onCancel={() => setEditingIngredient(null)}
                />
              ) : (
                <IngredientItem
                  key={ing.id}
                  ingredient={ing}
                  onEdit={setEditingIngredient}
                  onDelete={handleDeleteIngredient}
                />
              )
            )}
          </ul>
          <IngredientForm onAdd={handleAddIngredient} />
        </div>
      ) : (
        !loading && !error && <p>No recipe details available.</p>
      )}
    </Modal>
  );
}
