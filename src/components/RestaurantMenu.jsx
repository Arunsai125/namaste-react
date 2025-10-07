import { useState, useEffect } from "react";
import Shimmer from "./Shimmer";
import { useParams } from "react-router-dom";
import {data_url} from "../utils/constants";

const RestaurantMenu = () => {
  const [menu, setMenu] = useState(null);
  const { resId } = useParams();

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    const data = await fetch(
      data_url + resId 
    );
    const jsonData = await data.json();
    setMenu(jsonData.data);
  };

  if (menu === null) return <Shimmer />;

  const info = menu?.cards?.[2]?.card?.card?.info;
  const itemCards =
    menu?.cards?.[4]?.groupedCard?.cardGroupMap?.REGULAR?.cards?.[1]?.card?.card
      ?.carousel;

  if (!info || !itemCards)
    return <h3>Menu data not available for this restaurant.</h3>;

  const { name, city, costForTwoMessage, cuisines, avgRating } = info;

  return (
    <div className="res-card-info">
      <h2>
        {name} - {city} - {avgRating}
      </h2>
      <h4>
        {cuisines.join(", ")} - {costForTwoMessage}
      </h4>
      {itemCards.map((item, idx) => (
        <ol key={idx}>
          {item.dish.info.name} - ₹{item.dish.info.defaultPrice / 100}
        </ol>
      ))}
    </div>
  );
};

export default RestaurantMenu;
