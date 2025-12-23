import Shimmer from "./Shimmer";
import { useState } from "react";
import RestaurantCard, {highlyRatedRestaurants} from "./RestaurantCard";
import useRestaurantInfo from "../utils/useRestaurantInfo";
import useOnlineStatus from "../utils/useOnlineStatus";

const Body = () => {
  const [searchText, setSearchText] = useState("");
  const { listOfRestaurants, filteredRestaurants, setFilteredRestaurants } = useRestaurantInfo();
  const status = useOnlineStatus();
  const LabelPromotedRestaurants = highlyRatedRestaurants(RestaurantCard);
  if (listOfRestaurants.length === 0) return <Shimmer />;

  const handleSearch = () => {
    const filtered = listOfRestaurants.filter((res) =>
      res.info.name.toLowerCase().includes(searchText.toLowerCase())
    );
    setFilteredRestaurants(filtered);
  };
  console.log("data", listOfRestaurants);
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
          if(restaurant.info.avgRating >= 4.3) return <LabelPromotedRestaurants restaurant={restaurant} key={restaurant.info.id}/>
          return <RestaurantCard restaurant={restaurant} key={restaurant.info.id}/>
        })}
      </div>
    </div>
  );
};

export default Body;
