import React from 'react';
import './Button.css';

interface ActionButtonProps {
  type: 'edit' | 'save' | 'cancel' | 'delete';
  onClick?: () => void;
  children: React.ReactNode;
}

const ActionButton: React.FC<ActionButtonProps> = ({ type, onClick, children }) => {
  return (
    <button className={`button ${type}`} onClick={onClick}>
      {children}
    </button>
  );
};

export default ActionButton;
