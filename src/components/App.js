import FoodList from "./FoodList";
import { useEffect, useState } from "react";
import { createFood, deleteFood, getFoods } from "../api"; // 함수 import
import FoodForm from "./FoodForm";
import { LocaleProvider } from "../contexts/LocaleContext";
import LocaleSelect from "./LocaleSelect";

function App() {
  const [items, setItems] = useState([]);
  const [order, setOrder] = useState('createdAt');
  const [cursor, setCursor] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [loadingError, setLoadingError] = useState(null);
  const [search, setSearch] = useState("");

  const sortedItems = items.sort((a, b) => b[order] - a[order]);

  const handleBestClick = () => setOrder('calorie');

  const handleNewestClick = () => setOrder('createdAt');

  const handleDelete = async (id) => {
    const result = await deleteFood(id);
    if (!result) return;

    setItems((prevItems) => prevItems.filter((item) => item.id !== id));
  };

  const handleLoad = async (options) => {
    let result;
    try {
      setIsLoading(true);
      setLoadingError(null);
      result = await getFoods(options);
    } catch (error) {
      setLoadingError(error);
      return; // 에러 핸들링 후 undefined 반환하고 함수 실행 종료
    } finally {
      setIsLoading(false);
    }
    const {
      foods,
      paging: { nextCursor },
    } = result;
    if (!options.cursor) {
      setItems(foods);
    } else {
      setItems((prevItems) => [...prevItems, ...foods]);
    }
    setCursor(nextCursor);
  };

  const handleLoadMore = () => {
    handleLoad({ order, cursor, search });
  };

  const handleCreateSuccess = (food) => {
    setItems((prevItems) => [food, ...prevItems]);
  };

  const handleUpdateSuccess = (food) => {
    setItems((prevItems) => {
      const splitIdx = prevItems.findIndex((item) => item.id === food.id);
      return [
        ...prevItems.slice(0, splitIdx),
        food,
        ...prevItems.slice(splitIdx + 1),
      ];
    });
  };

  const handleSearchSubmit = async (e) => {
    e.preventDefault();
    setSearch(e.target['search'].value); // search 스테이트 값을 인풋의 값으로 변경
    handleLoad({ search });
  };

  const handleKeyDown = (e) => {
    if (e.target.key === 'Enter') {
      handleSearchSubmit(e);
    }
  };

  useEffect(() => {
    handleLoad({ order, search });
  }, [order, search]);

  return (
    <LocaleProvider defaultValue={'ko'}>
      <div>
        <LocaleSelect />
        <FoodForm onSubmit={createFood} onSubmitSuccess={handleCreateSuccess} />
        <button onClick={handleNewestClick}>최신순</button>
        <button onClick={handleBestClick}>칼로리순</button>
        <form onSubmit={handleSearchSubmit}>
          <input name='search' onKeyDown={handleKeyDown} />
          <button type='submit'>검색</button>
        </form>
        <FoodList items={sortedItems} onDelete={handleDelete} />
        {cursor && (
          <button disabled={isLoading} onClick={handleLoadMore}>
            더 보기
          </button>
        )}
        {loadingError?.message && <span>{loadingError.message}</span>}
      </div>
    </LocaleProvider>
  );
}

export default App;
