import Shimmer from "./Shimmer";
import { useState } from "react";
import { Link } from "react-router-dom";
import useRestaurantInfo from "../utils/useRestaurantInfo";
import useOnlineStatus from "../utils/useOnlineStatus";

const Body = () => {
  const [searchText, setSearchText] = useState("");
  const { listOfRestaurants, filteredRestaurants, setFilteredRestaurants } = useRestaurantInfo();
  const status = useOnlineStatus();

  if (listOfRestaurants.length === 0) return <Shimmer />;

  const handleSearch = () => {
    const filtered = listOfRestaurants.filter((res) =>
      res.info.name.toLowerCase().includes(searchText.toLowerCase())
    );
    setFilteredRestaurants(filtered);
  };

  if (status === false)
    return (
      <h1 className="text-center mt-20 text-xl text-red-600 font-semibold">
        Looks like you're offline. Please check your internet connection!
      </h1>
    );

  return (
    <div className="body">
      {/* 🔍 Centered Search bar */}
      <div className="flex justify-center items-center mt-10 mb-8">
        <div className="flex shadow-md">
          <input
            type="text"
            className="border border-gray-300 p-2 w-72 rounded-l-md focus:outline-none focus:ring-2 focus:ring-green-400"
            placeholder="Search restaurants..."
            value={searchText}
            onChange={(e) => setSearchText(e.target.value)}
          />
          <button
            className="px-5 py-2 bg-green-500 text-white rounded-r-md hover:bg-green-600 transition-all duration-200"
            onClick={handleSearch}
          >
            Search
          </button>
        </div>
      </div>

      {/* 🍴 Restaurant list */}
      <div className="flex flex-wrap justify-center gap-6 px-6">
        {filteredRestaurants.map((restaurant) => {
          const { id, name, cloudinaryImageId, cuisines, avgRating, areaName } = restaurant.info;
          return (
            <Link to={`/restaurant/${id}`} key={id}>
              <div className="w-64 bg-white rounded-xl overflow-hidden shadow-md hover:shadow-lg hover:scale-105 transition-all duration-200">
                <img
                  src={`https://media-assets.swiggy.com/swiggy/image/upload/fl_lossy,f_auto,q_auto,w_660/${cloudinaryImageId}`}
                  alt={name}
                  className="w-full h-40 object-cover"
                />
                <div className="p-4">
                  <h3 className="text-lg font-semibold text-gray-800 truncate">{name}</h3>
                  <p className="text-sm text-gray-500">{cuisines.join(", ")}</p>
                  <div className="flex justify-between items-center mt-2 text-sm text-gray-600">
                    <span>⭐ {avgRating}</span>
                    <span>{areaName}</span>
                  </div>
                </div>
              </div>
            </Link>
          );
        })}
      </div>
    </div>
  );
};

export default Body;
