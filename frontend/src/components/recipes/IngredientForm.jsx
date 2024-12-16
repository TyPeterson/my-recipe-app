import React, { useState } from 'react';

export default function IngredientForm({ onAdd }) {
  const [name, setName] = useState('');
  const [quantity, setQuantity] = useState('');

  function handleSubmit(e) {
    e.preventDefault();
    if(!name || !quantity) return;
    onAdd({ name, quantity });
    setName('');
    setQuantity('');
  }

  return (
    <form onSubmit={handleSubmit} style={{margin:'1rem 0'}}>
      <h4>Add Ingredient</h4>
      <div>
        <input placeholder="Name" value={name} onChange={e => setName(e.target.value)} required />
      </div>
      <div style={{marginTop:'0.5rem'}}>
        <input placeholder="Quantity" value={quantity} onChange={e => setQuantity(e.target.value)} required />
      </div>
      <button style={{marginTop:'0.5rem'}} type="submit">Add</button>
    </form>
  );
}
