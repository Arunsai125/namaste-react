import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import Shimmer from "./Shimmer";
import menuData from "../menu_sample.json";
import RestaurantCategory from "./RestaurantCategory";

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
  const allItems = Array.from(
    new Map(
      regularCards
        .flatMap((c) => c.card?.card?.itemCards || [])
        .map((item) => [item.card?.info?.id, item.card?.info])
    ).values()
  );

  if (!info || allItems.length === 0)
    return (
      <h3 className="text-center text-gray-600 mt-10 text-lg">
        Menu data not available for this restaurant.
      </h3>
    );

  const { name, city, costForTwoMessage, cuisines, avgRating } = info;
  const newData =
    menuData.data?.cards[4]?.groupedCard?.cardGroupMap?.REGULAR?.cards.filter(
      (c) =>
        c.card?.card?.["@type"] ===
        "type.googleapis.com/swiggy.presentation.food.v2.ItemCategory"
    );
  console.log(newData);
  return (
    <div className="text-center m-6 p-6">
      <h2 className=" text-2xl font-bold mb-2">
        {name} • {city} • ⭐ {avgRating}
      </h2>
      <h4 className="text-gray-600 mb-6">
        {cuisines.join(", ")} • {costForTwoMessage}
      </h4>
      {newData.map((c, idx) => (
        <RestaurantCategory key={idx} category={c.card.card} />
      ))}
      {error && (
        <p className="text-center text-blue-300 mt-4 font-medium">{error}</p>
      )}
    </div>
  );
};

export default RestaurantMenu;
