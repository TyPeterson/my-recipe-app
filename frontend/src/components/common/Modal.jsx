import React from 'react';

export default function Modal({ open, onClose, children }) {
  if (!open) return null;

  return (
    <div
      style={{
        position: 'fixed',
        top: 0,
        left: 0,
        width: '100%',
        height: '100%',
        background: 'rgba(0, 0, 0, 0.5)',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        zIndex: 1000,
      }}
    >
      <div
        style={{
          background: '#fff',
          padding: '1.5rem',
          borderRadius: '8px',
          boxShadow: '0 4px 8px rgba(0, 0, 0, 0.2)',
          width: '90%',
          maxWidth: '600px',
          position: 'relative',
        }}
      >
        <button
          style={{
            position: 'absolute',
            top: '10px',
            right: '10px',
            background: '#ff4d4d',
            color: '#fff',
            border: 'none',
            borderRadius: '50%',
            width: '30px',
            height: '30px',
            cursor: 'pointer',
            textAlign: 'center',
          }}
          onClick={onClose}
        >
          X
        </button>
        {children}
      </div>
    </div>
  );
}
