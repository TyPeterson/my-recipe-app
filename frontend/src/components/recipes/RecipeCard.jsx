import React from 'react';

export default function RecipeCard({ recipe, onClick }) {
  return (
    <div
      style={{
        border: '1px solid #ddd',
        borderRadius: '8px',
        padding: '1rem',
        backgroundColor: '#fff',
        boxShadow: '0 2px 4px rgba(0, 0, 0, 0.1)',
        cursor: 'pointer',
        width: '200px',
        textAlign: 'center',
        margin: '1rem',
        transition: 'transform 0.2s, box-shadow 0.2s',
      }}
      onClick={() => onClick(recipe)}
      onMouseEnter={(e) => {
        e.currentTarget.style.transform = 'scale(1.05)';
        e.currentTarget.style.boxShadow = '0 4px 8px rgba(0, 0, 0, 0.15)';
      }}
      onMouseLeave={(e) => {
        e.currentTarget.style.transform = 'scale(1)';
        e.currentTarget.style.boxShadow = '0 2px 4px rgba(0, 0, 0, 0.1)';
      }}
    >
      <h3 style={{ marginBottom: '0.5rem', fontSize: '1.25rem', color: '#333' }}>
        {recipe.title}
      </h3>
    </div>
  );
}
