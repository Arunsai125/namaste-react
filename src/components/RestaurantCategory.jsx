import { useState } from "react";
import ShowItems from "./ShowItems";

const RestaurantCategory = ({ category }) => {
  const [click, setClick] = useState(false);
  const functionClick = () => {
    setClick(!click);
  };
  return (
    <div
      className="w-6/12 m-auto bg-gray-300  p-2  cursor-pointer"
      onClick={functionClick}
    >
      <div className="flex justify-between">
        <span className="font-bold text-lg">
          {category.title} ({category.itemCards.length})
        </span>
        <span>⌄</span>
      </div>
      {click && <ShowItems items={category.itemCards} />}
    </div>
  );
};

export default RestaurantCategory;
