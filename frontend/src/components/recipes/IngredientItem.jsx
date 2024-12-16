import React from 'react';

export default function IngredientItem({ ingredient, onEdit, onDelete }) {
  return (
    <li
      style={{
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        padding: '0.5rem 1rem',
        borderBottom: '1px solid #ddd',
      }}
    >
      <div>
        <strong>{ingredient.name}</strong> - {ingredient.quantity}
        {ingredient.image_url && (
          <img
            src={ingredient.image_url}
            alt={ingredient.name}
            style={{
              width: '30px',
              height: '30px',
              marginLeft: '0.5rem',
              borderRadius: '4px',
            }}
          />
        )}
      </div>
      <div>
        <button style={{ marginRight: '0.5rem' }} onClick={() => onEdit(ingredient)}>
          Edit
        </button>
        <button style={{ backgroundColor: '#ff4d4d' }} onClick={() => onDelete(ingredient)}>
          Delete
        </button>
      </div>
    </li>
  );
}
