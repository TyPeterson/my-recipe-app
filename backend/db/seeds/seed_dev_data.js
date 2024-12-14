exports.seed = async function(knex) {
  // clear existing data in reverse order of table dependencies
  await knex('recipe_shares').del();
  await knex('ingredients').del();
  await knex('recipes').del();
  await knex('users').del();

  // insert users
  const [user1, user2] = await knex('users')
    .insert([
      {
        email: 'testuser1@example.com',
        password_hash: 'hashed_password_1',
      },
      {
        email: 'testuser2@example.com',
        password_hash: 'hashed_password_2',
      },
    ])
    .returning('*');

  // insert recipes
  const [recipe] = await knex('recipes')
    .insert({
      owner_user_id: user1.id,
      title: 'Chocolate Cake',
      instructions: '1. Preheat oven to 350°F.\n2. Mix dry ingredients.\n3. Bake for 30 minutes.',
    })
    .returning('*');

  // insert ingredients
  await knex('ingredients').insert([
    {
      recipe_id: recipe.id,
      name: 'Flour',
      quantity: '2 cups',
    },
    {
      recipe_id: recipe.id,
      name: 'Cocoa Powder',
      quantity: '1/2 cup',
    },
    {
      recipe_id: recipe.id,
      name: 'Sugar',
      quantity: '1 cup',
    },
  ]);

  // share recipe with user2
  await knex('recipe_shares').insert({
    recipe_id: recipe.id,
    shared_with_user_id: user2.id,
    can_edit: false,
  });
};
