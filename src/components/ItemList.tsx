import React, { useState } from 'react';
import styled from 'styled-components';
import { Item } from '../types';
import ActionButtons from './ActionButtons/ActionButtons';



interface ItemListProps {
  items: Item[];
  onEdit: (id: string, updatedItem: Item) => void;
  onDelete: (id: string) => void;
}

const ItemList: React.FC<ItemListProps> = ({ items, onEdit, onDelete }) => {
  const [editItem, setEditItem] = useState<Item | null>(null);

  const handleSaveEdit = () => {
    if (editItem) {
      onEdit(editItem.id, editItem);
      setEditItem(null);
    }
  };

  return (
    <div>
      {items.map((item) => (
        <ItemContainer key={item.id}>
          {editItem?.id === item.id ? (
            <EditSection>
              <EditInput
                type="text"
                value={editItem.name || ''}
                onChange={(e) => setEditItem({ ...editItem, name: e.target.value })}
              />
              <EditTextarea
                value={editItem.description || ''}
                onChange={(e) => setEditItem({ ...editItem, description: e.target.value })}
              />
              <ActionButtons
                onSave={handleSaveEdit}
                onCancel={() => setEditItem(null)}
                isEditing={true}
              />
            </EditSection>
          ) : (
            <ItemDetails>
              <ItemInfo>
                <h3>{item.name}</h3>
                <p>{item.description}</p>
              </ItemInfo>
              <ActionButtons
                onEdit={() => setEditItem(item)}
                onDelete={() => onDelete(item.id)}
                isEditing={false}
              />
            </ItemDetails>
          )}
        </ItemContainer>
      ))}
    </div>
  );
};

export default ItemList;

const ItemContainer = styled.div`
  padding: 10px;
  border-bottom: 1px solid #ccc;
  position: relative;
`;

const EditSection = styled.div`
  display: flex;
  gap: 10px;
  align-items: center;
  width: 100%;
`;

const EditInput = styled.input`
  padding: 8px 12px;
  font-size: 14px;
  border: 1px solid #ccc;
  border-radius: 4px;
  width: 150px;
`;

const EditTextarea = styled.textarea`
  padding: 8px 12px;
  font-size: 14px;
  border: 1px solid #ccc;
  border-radius: 4px;
  width: 200px;
  height: 40px;
`;

const ItemDetails = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  padding-right: 50px; /* Make space for action buttons */
`;

const ItemInfo = styled.div`
  h3 {
    margin: 0;
    font-size: 16px;
  }
  p {
    margin: 5px 0;
    color: #666;
  }
`;
