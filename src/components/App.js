import FoodList from "./FoodList";
import mockitems from "../mock.json";
import { useState } from "react";

function App() {
  const [items, setItems] = useState(mockitems);
  const [order, setOrder] = useState("createdAt");

  const handleNewestClick = () => setOrder("createdAt");
  const handleBestClick = () => setOrder("calorie");
  const handleDelete = (id) => {
    const nextItems = items.filter((item) => item.id !== id);
    setItems(nextItems);
  };

  const sortedItems = items.sort((a, b) => b[order] - a[order]);

  return (
    <div>
      <button onClick={handleNewestClick}>최신순</button>
      <button onClick={handleBestClick}>칼로리순</button>
      <FoodList items={sortedItems} onDelete={handleDelete} />
    </div>
  );
}

export default App;
