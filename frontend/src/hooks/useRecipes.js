import { useState, useEffect } from 'react';
import { useAuth } from './useAuth';
import { getUserRecipes } from '../api/recipes';

export function useRecipes() {
  const { token } = useAuth();
  const [recipes, setRecipes] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (!token) return;

    async function fetchRecipes() {
      try {
        const data = await getUserRecipes(token);
        console.log('Fetching recipes:', data);
        setRecipes(data.recipes || []);
      } catch (err) {
        setError(err.message);
      }
    }

    fetchRecipes();
  }, [token]);

  return { recipes, error };
}
