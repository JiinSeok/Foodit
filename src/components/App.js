import FoodList from "./FoodList";
import { useState } from "react";
import { getFoods } from "../api"; // 함수 import

function App() {
  const [items, setItems] = useState([]);
  const [order, setOrder] = useState("createdAt");

  const handleNewestClick = () => setOrder("createdAt");
  const handleBestClick = () => setOrder("calorie");
  const handleDelete = (id) => {
    const nextItems = items.filter((item) => item.id !== id);
    setItems(nextItems);
  };
  const handleLoadClick = async () => {
    const { foods } = await getFoods();
    setItems(foods);
  };

  const sortedItems = items.sort((a, b) => b[order] - a[order]);

  return (
    <div>
      <button onClick={handleNewestClick}>최신순</button>
      <button onClick={handleBestClick}>칼로리순</button>
      <FoodList items={sortedItems} onDelete={handleDelete} />
      <button onClick={handleLoadClick}>불러오기</button>
    </div>
  );
}

export default App;
