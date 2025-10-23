import { CDN_URL } from "../utils/constants";
import { useState } from "react";

const ShowItems = ({ items }) => {
  const [counts, setCounts] = useState({});
  const handleAdd = (id) => {
    setCounts((prev) => ({
      ...prev,
      [id]: (prev[id] || 0) + 1,
    }));
  };

  return (
    <div>
      {items.map((item) => {
        const { id, name, price, description, imageId } = item.card.info;
        const count = counts[id] || 0;

        return (
          <div
            key={id}
            className="flex justify-between p-2 my-2 border-black border-b-2"
          >
            <div className="w-9/12 text-left">
              <span className="font-bold">{name}</span>
              <span className="font-bold"> - {price / 100} ₹</span>
              <p className="text-xs my-4">{description}</p>
            </div>

            <div className="w-3/12 relative">
              <button
                className="absolute bottom-2 left-1/2 transform -translate-x-1/2 bg-black text-white px-3 py-1 text-sm rounded-md"
                onClick={(e) => {
                  e.stopPropagation();
                  handleAdd(id);
                }}
              >
                Add + {count}
              </button>
              <img src={CDN_URL + imageId} className="w-full rounded-lg" />
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default ShowItems;
