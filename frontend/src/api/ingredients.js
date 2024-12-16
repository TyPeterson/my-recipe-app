const BASE_URL = 'http://localhost:3000';

export async function addIngredient(token, recipeId, name, quantity) {
  const res = await fetch(`${BASE_URL}/recipes/${recipeId}/ingredients`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`
    },
    body: JSON.stringify({ name, quantity })
  });
  if (!res.ok) {
    throw new Error((await res.json()).error || 'Failed to add ingredient');
  }
  return res.json(); // returns { ingredient: {...} }
}

export async function updateIngredient(token, ingredientId, data) {
  const res = await fetch(`${BASE_URL}/ingredients/${ingredientId}`, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`
    },
    body: JSON.stringify(data)
  });
  if (!res.ok) {
    throw new Error((await res.json()).error || 'Failed to update ingredient');
  }
  return res.json(); // { ingredient: {...} }
}

export async function deleteIngredient(token, ingredientId) {
  const res = await fetch(`${BASE_URL}/ingredients/${ingredientId}`, {
    method: 'DELETE',
    headers: { 'Authorization': `Bearer ${token}` }
  });
  if (!res.ok) {
    throw new Error((await res.json()).error || 'Failed to delete ingredient');
  }
  return true;
}
