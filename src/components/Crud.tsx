import React, { useState, useEffect } from 'react';
import { Item } from '../types';
import ItemForm from './ItemForm';
import ItemList from './ItemList';

const Crud: React.FC = () => {
  const [items, setItems] = useState<Item[]>([]);

  useEffect(() => {
    const storedItems = localStorage.getItem('items');
    if (storedItems) {
      setItems(JSON.parse(storedItems));
    }
  }, []);

  const saveToLocalStorage = (updatedItems: Item[]) => {
    localStorage.setItem('items', JSON.stringify(updatedItems));
  };

  const addItem = (item: Item) => {
    const existingItem = items.find((existing) => existing?.name?.toLowerCase() === item?.name?.toLowerCase());
    if (existingItem) {
    alert('An item with this name already exists.');
    return;
  }
    const updatedItems = [...items, item];
    setItems(updatedItems);
    saveToLocalStorage(updatedItems);
  };

  const editItem = (id: string, updatedItem: Item) => {
    const updatedItems = items.map((item) =>
      item.id === id ? updatedItem : item
    );
    setItems(updatedItems);
    saveToLocalStorage(updatedItems);
  };

  const deleteItem = (id: string) => {
    const updatedItems = items.filter((item) => item.id !== id);
    setItems(updatedItems);
    saveToLocalStorage(updatedItems);
  };

  return (
    <div className="container">
      <h1>CRUD App</h1>
      <ItemForm onSave={addItem} />
      <ItemList items={items} onEdit={editItem} onDelete={deleteItem} />
    </div>
  );
};

export default Crud;
