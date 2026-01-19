import { CDN_URL } from "../utils/constants";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { addItem } from "../utils/cartSlice";

const ShowItems = ({ items }) => {
  const [counts, setCounts] = useState({});
  const dispatch = useDispatch();

  const handleAdd = (item) => {
    dispatch(addItem(item));
    setCounts((prev) => ({
      ...prev,
      [item.id]: (prev[item.id] || 0) + 1,
    }));
  };

  if (!items || items.length === 0) {
    return <p>No items</p>;
  }

  return (
    <div>
      {items.map((item, index) => {
        const info = item.card?.info ?? item;
        const { id, name, price, description, imageId } = info;
        const count = counts[id] || 0;

        return (
          <div
            key={`${id}-${index}`}
            className="flex justify-between p-2 my-2 border-b border-black"
          >
            <div className="w-9/12 text-left">
              <span className="font-bold">{name}</span>
              <span className="font-bold"> - {price / 100} ₹</span>
              <p className="text-xs my-4">{description}</p>
            </div>

            <div className="w-3/12 relative">
              <button
                className="absolute bottom-2 left-1/2 -translate-x-1/2 bg-black text-white px-3 py-1 text-sm rounded-md"
                onClick={() => handleAdd(item)}
              >
                Add + {count}
              </button>

              <img
                src={CDN_URL + imageId}
                className="w-full rounded-lg"
                alt={name}
              />
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default ShowItems;
