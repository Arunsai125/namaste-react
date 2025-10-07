import Shimmer from "./Shimmer";
import { useState, useEffect } from "react";
import { Link } from "react-router-dom";

const Body = () => {
  const [text, setText] = useState("");
  const [listOfRestaurants, setListOfRestaurants] = useState([]);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    const data = await fetch(
      "https://corsproxy.io/?https://www.swiggy.com/dapi/restaurants/list/v5?lat=17.4236771&lng=78.3452597&is-seo-homepage-enabled=true&page_type=DESKTOP_WEB_LISTING"
    );
    const jsonData = await data.json();
    setListOfRestaurants(
      jsonData?.data?.cards?.[4]?.card?.card?.gridElements?.infoWithStyle
        ?.restaurants || []
    );
  };

  if (listOfRestaurants.length === 0) return <Shimmer />;

  return (
    <div className="body">
      {/* Search section */}
      <div className="search-container">
        <input
          type="text"
          className="search-input"
          placeholder="Search restaurants..."
          value={text}
          onChange={(e) => setText(e.target.value)}
        />
        <button
          className="btn-primary"
          onClick={() => alert(`Searching for "${text}"`)}
        >
          Search
        </button>
      </div>

      {/* Restaurant cards */}
      <div className="restaurant-list">
        {listOfRestaurants.map((r) => (
          <Link to={`/restaurant/${r.info.id}`} key={r.info.id}>
            <div className="restaurant-card">
              <img
                className="restaurant-logo"
                src={`https://media-assets.swiggy.com/swiggy/image/upload/fl_lossy,f_auto,q_auto,w_660/${r.info.cloudinaryImageId}`}
                alt={r.info.name}
              />
              <h3>{r.info.name}</h3>
              <h4>{r.info.cuisines.join(", ")}</h4>
              <h4>{r.info.avgRating} ⭐</h4>
              <h4>{r.info.areaName}</h4>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
};

export default Body;
