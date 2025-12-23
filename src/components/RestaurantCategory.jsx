import ShowItems from "./ShowItems";

const RestaurantCategory = ({ category, showItems, setShowIndex }) => {
  const handleClick = () => {
    setShowIndex();
  };
  return (
    <div className="w-6/12 m-auto bg-gray-300  p-2  cursor-pointer">
      <div className="flex justify-between" onClick={handleClick}>
        <span className="font-bold text-lg">
          {category.title} ({category.itemCards.length})
        </span>
        <span>⌄</span>
      </div>
      {showItems && <ShowItems items={category.itemCards} />}
    </div>
  );
};

export default RestaurantCategory;
