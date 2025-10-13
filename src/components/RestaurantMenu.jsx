import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import Shimmer from "./Shimmer";
import menuData from "../menu_sample.json";

const RestaurantMenu = () => {
  const [menu, setMenu] = useState(null);
  const [error, setError] = useState(null);
  const { resId } = useParams();

  useEffect(() => {
    const fetchMenu = async () => {
      try {
        const res = await fetch(
          `https://corsproxy.io/?https://www.swiggy.com/dapi/menu/pl?page-type=REGULAR_MENU&complete-menu=true&lat=17.4236771&lng=78.3452597&restaurantId=${resId}`
        );
        const json = await res.json();

        // Some restaurants might have incomplete data, use fallback
        if (!json?.data) {
          console.warn("Fallback to local menu data...");
          setMenu(menuData.data || menuData);
        } else {
          setMenu(json.data);
        }
      } catch (err) {
        setMenu(menuData.data || menuData);
        setError("Showing sample menu (live data blocked)");
      }
    };

    fetchMenu();
  }, [resId]);

  if (!menu) return <Shimmer />;

  const info = menu?.cards?.find((c) => c.card?.card?.info)?.card?.card?.info;
  const regularCards =
    menu?.cards?.find((c) => c.groupedCard)?.groupedCard?.cardGroupMap?.REGULAR
      ?.cards || [];

  const allItems = regularCards
    .flatMap((c) => c.card?.card?.itemCards || [])
    .map((item) => item.card?.info)
    .filter(Boolean);

  if (!info || allItems.length === 0)
    return <h3>Menu data not available for this restaurant.</h3>;

  const { name, city, costForTwoMessage, cuisines, avgRating } = info;

  return (
    <div className="res-card-info">
      {error && <p style={{ color: "red", fontSize: "14px" }}>{error}</p>}

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
