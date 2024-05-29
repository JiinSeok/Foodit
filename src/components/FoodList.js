import { useState } from 'react';
import FoodForm from './FoodForm';
import './FoodList.css';

function formatDate(value) {
  const date = new Date(value);
  return `${date.getFullYear()}. ${date.getMonth() + 1}. ${date.getDate()}`;
}

function FoodListItem({ item, onEdit, onDelete }) {
  const { imgUrl, title, calorie, content, createdAt } = item;

  const handleEditClick = () => {
    onEdit(item.id);
  };

  const handleDeleteClick = () => {
    onDelete(item.id);
  };

  return (
    <div className="FoodListItem">
      <img src={imgUrl} alt={title} />
      <div>{title}</div>
      <div>{calorie}</div>
      <div>{content}</div>
      <div>{formatDate(createdAt)}</div>
      <button onClick={handleEditClick}>수정</button>
      <button onClick={handleDeleteClick}>삭제</button>
    </div>
  );
}

function FoodList({ items, onUpdate, onUpdateSuccess, onDelete }) {
  const [editingId, setEditingId] = useState(null);

  const handleCancel = () => {
    setEditingId(null);
  };

  return (
    <ul className="FoodList">
      {items.map((item) => {
        if (item.id === editingId) {
          const { id, imgUrl, title, calorie, content } = item;
          const initialValues = { title, calorie, content };

          const handleSubmit = (formData) => onUpdate(id, formData); // updateFood
          const handleSubmitSuccess = (food) => {
            // handleUpdateSuccess 수정한 아이템만 목록에서 교체
            onUpdateSuccess(food);
            setEditingId(null);
          };

          return (
            <li key={item.id}>
              <FoodForm
                initialPreview={imgUrl}
                initialValues={initialValues}
                onSubmit={handleSubmit}
                onSubmitSuccess={handleSubmitSuccess}
                onCancel={handleCancel}
              />
            </li>
          );
        }
        return (
          // items라는 Prop의 요소마다 <li> 태그를 렌더링 // <li> 태그 안에는 FoodListItem을 렌더링
          <li key={item.id}>
            <FoodListItem
              item={item}
              onEdit={setEditingId}
              onDelete={onDelete} // handleDelete
            />
          </li>
        );
      })}
    </ul>
  );
}

export default FoodList;
