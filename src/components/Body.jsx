import Shimmer from "./Shimmer";
import { useState, useEffect } from "react";
import { Link } from "react-router-dom";

const Body = () => {
  const [searchText, setSearchText] = useState("");
  const [listOfRestaurants, setListOfRestaurants] = useState([]);
  const [filteredRestaurants, setFilteredRestaurants] = useState([]);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    const data = await fetch(
      "https://corsproxy.io/?https://www.swiggy.com/dapi/restaurants/list/v5?lat=17.4236771&lng=78.3452597&is-seo-homepage-enabled=true&page_type=DESKTOP_WEB_LISTING"
    );
    const json = await data.json();
    const restaurants =
      json?.data?.cards?.[4]?.card?.card?.gridElements?.infoWithStyle
        ?.restaurants || [];

    setListOfRestaurants(restaurants);
    setFilteredRestaurants(restaurants);
  };

  if (listOfRestaurants.length === 0) return <Shimmer />;

  const handleSearch = () => {
    const filtered = listOfRestaurants.filter((res) =>
      res.info.name.toLowerCase().includes(searchText.toLowerCase())
    );
    setFilteredRestaurants(filtered);
  };

  return (
    <div className="body">
      {/* 🔍 Search bar */}
      <div className="search-container">
        <input
          type="text"
          className="search-input"
          placeholder="Search restaurants..."
          value={searchText}
          onChange={(e) => setSearchText(e.target.value)}
        />
        <button className="btn-primary" onClick={handleSearch}>
          Search
        </button>
      </div>

      {/* 🍴 Restaurant list */}
      <div className="restaurant-list">
        {filteredRestaurants.map((restaurant) => (
          <Link to={`/restaurant/${restaurant.info.id}`} key={restaurant.info.id}>
            <div className="restaurant-card">
              <img
                className="restaurant-logo"
                src={`https://media-assets.swiggy.com/swiggy/image/upload/fl_lossy,f_auto,q_auto,w_660/${restaurant.info.cloudinaryImageId}`}
                alt={restaurant.info.name}
              />
              <h3>{restaurant.info.name}</h3>
              <h4>{restaurant.info.cuisines.join(", ")}</h4>
              <h4>{restaurant.info.avgRating} ⭐</h4>
              <h4>{restaurant.info.areaName}</h4>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
};

export default Body;
