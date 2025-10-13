import { useState, useEffect } from "react";
import Shimmer from "./Shimmer";
import { useParams } from "react-router-dom";
import menuData from "../menu_sample.json"; // using local JSON

const RestaurantMenu = () => {
  const [menu, setMenu] = useState(null);
  const { resId } = useParams();

  useEffect(() => {
    setMenu(menuData.data || menuData); // adjust for mock data
  }, []);

  if (!menu) return <Shimmer />;

  const info = menu?.cards?.[2]?.card?.card?.info;
  const regularCards =
    menu?.cards?.find((c) => c.groupedCard)?.groupedCard?.cardGroupMap?.REGULAR
      ?.cards || [];

  // Flatten all dish entries across categories
  const allItems = regularCards
    .flatMap((c) => c.card?.card?.itemCards || [])
    .map((item) => item.card?.info)
    .filter(Boolean);

  if (!info || allItems.length === 0)
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

      <h3>Recommended Dishes</h3>
      <ul>
        {allItems.map((dish, idx) => (
          <li key={`${dish.id}-${idx}`}>
            {dish.name} - ₹{(dish.price ?? dish.defaultPrice ?? 0) / 100}
          </li>

        ))}
      </ul>
    </div>
  );
};

export default RestaurantMenu;
