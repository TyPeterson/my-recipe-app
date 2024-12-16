export async function getUserRecipes(token) {
  const res = await fetch('http://localhost:3000/recipes', {
    headers: {
      'Authorization': `Bearer ${token}`
    }
  });

  if (!res.ok) {
    const errorData = await res.json();
    throw new Error(errorData.error || 'Failed to fetch recipes');
  }

  return res.json();
}

export async function getRecipeById(token, recipeId) {
    const res = await fetch(`http://localhost:3000/recipes/${recipeId}`, {
      headers: {
        'Authorization': `Bearer ${token}`
      }
    });
    if (!res.ok) {
      throw new Error((await res.json()).error || 'Failed to fetch recipe details');
    }
    return res.json(); // { recipe: { id, title, instructions, ingredients: [...] } }
  }
  