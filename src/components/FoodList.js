import "./FoodList.css";

function formatDate(value) {
  const date = new Date(value);
  return `${date.getFullYear()}. ${date.getMonth() + 1}. ${date.getDate()}`;
}

function FoodListItem({ item }) {
  const { imgUrl, title, calorie, content, createdAt } = item;

  return (
    <div>
      <img src={imgUrl} alt={title} />
      <div>{title}</div>
      <div>{calorie}</div>
      <div>{content}</div>
      <div>{formatDate(createdAt)}</div>
    </div>
  );
}

function FoodList({ items }) {
  return (
    <ul>
      {items.map((item) => (
        // items라는 Prop의 요소마다 <li> 태그를 렌더링 // <li> 태그 안에는 FoodListItem을 렌더링
        <li key={item.id}>
          <FoodListItem item={item} />
        </li>
      ))}
    </ul>
  );
}

export default FoodList;
