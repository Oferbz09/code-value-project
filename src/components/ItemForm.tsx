import React, { useState } from 'react';
import { Item } from '../types';

interface ItemFormProps {
  onSave: (item: Item) => void;
}

const ItemForm: React.FC<ItemFormProps> = ({ onSave }) => {
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSave({ id: Date.now().toString(), name, description });
    setName('');
    setDescription('');
  };

  return (
    <form onSubmit={handleSubmit}>
      <input
        type="text"
        placeholder="Item Name"
        value={name}
        onChange={(e) => setName(e.target.value)}
        required
      />
      <textarea
        placeholder="Description"
        value={description}
        onChange={(e) => setDescription(e.target.value)}
        
      ></textarea>
      <button type="submit">Add Item</button>
    </form>
  );
};

export default ItemForm;
