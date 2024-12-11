import React, { useState } from 'react';
import Button from '../sharedComponents/Button/Button';
import ConfirmModal from '../sharedComponents/Modal/ConfirmModal';

interface ActionButtonsProps {
  onEdit?: () => void;
  onDelete?: () => void;
  onSave?: () => void;
  onCancel?: () => void;
  isEditing: boolean;
}

const ActionButtons: React.FC<ActionButtonsProps> = ({ onEdit, onDelete, onSave, onCancel, isEditing }) => {
  const [isDeleteModalOpen, setDeleteModalOpen] = useState(false);

  const handleDeleteClick = () => {
    setDeleteModalOpen(true);
  };

  const handleConfirmDelete = () => {
    if (onDelete) onDelete();
    setDeleteModalOpen(false);
  };

  const handleCancelDelete = () => {
    setDeleteModalOpen(false);
  };

  return (
    <>
      <div className="action-buttons">
        {isEditing ? (
          <>
            <Button type="save" onClick={onSave}>Save</Button>
            <Button type="cancel" onClick={onCancel}>Cancel</Button>
          </>
        ) : (
          <>
            <Button type="edit" onClick={onEdit}>Edit</Button>
            <Button type="delete" onClick={handleDeleteClick}>Delete</Button>
          </>
        )}
      </div>

      <ConfirmModal 
        isOpen={isDeleteModalOpen} 
        onClose={handleCancelDelete} 
        onConfirm={handleConfirmDelete} 
        title="Delete Item" 
        message="Are you sure you want to delete this item?" 
      />
    </>
  );
};

export default ActionButtons;
