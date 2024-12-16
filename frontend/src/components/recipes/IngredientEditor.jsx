import React, { useState } from 'react';

export default function IngredientEditor({ ingredient, onSave, onCancel }) {
  const [name, setName] = useState(ingredient.name);
  const [quantity, setQuantity] = useState(ingredient.quantity);

  function handleSave(e) {
    e.preventDefault();
    onSave({ ...ingredient, name, quantity });
  }

  return (
    <form onSubmit={handleSave}>
      <h4>Edit Ingredient</h4>
      <div>
        <input placeholder="Name" value={name} onChange={e => setName(e.target.value)} required />
      </div>
      <div style={{marginTop:'0.5rem'}}>
        <input placeholder="Quantity" value={quantity} onChange={e => setQuantity(e.target.value)} required />
      </div>
      {/* Placeholder for image set: a button to "Set Image" would go here */}
      <button style={{marginTop:'0.5rem'}} type="submit">Save</button>
      <button style={{marginLeft:'0.5rem'}} type="button" onClick={onCancel}>Cancel</button>
    </form>
  );
}
