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
    menu?.cards?.find((c) => c.groupedCard)?.groupedCard?.cardGroupMap?.REGULAR?.cards || [];

  const allItems = regularCards
    .flatMap((c) => c.card?.card?.itemCards || [])
    .map((item) => item.card?.info)
    .filter(Boolean);

  if (!info || allItems.length === 0)
    return <h3 className="text-center text-gray-600 mt-10 text-lg">
      Menu data not available for this restaurant.
    </h3>;

  const { name, city, costForTwoMessage, cuisines, avgRating } = info;

  return (
    <div className="m-6 p-6">
      <h2 className="text-2xl font-bold mb-2">
        {name} • {city} • ⭐ {avgRating}
      </h2>
      <h4 className="text-gray-600 mb-6">
        {cuisines.join(", ")} • {costForTwoMessage}
      </h4>

      <h3 className="text-xl font-semibold mb-4">Recommended Dishes</h3>

      <div className="flex flex-wrap justify-center gap-6">
        {allItems.map((dish, idx) => (
          <div
            key={`${dish.id}-${idx}`}
            className="w-56 bg-white rounded-xl shadow-md p-4 m-3 hover:scale-105 hover:shadow-lg transition-all duration-200"
          >
            <img
              src={
                dish.imageId
                  ? `https://media-assets.swiggy.com/swiggy/image/upload/${dish.imageId}`
                  : "/placeholder.jpg"
              }
              alt={dish.name}
              className="w-full h-40 object-cover rounded-lg mb-3"
            />
            <h3 className="text-lg font-semibold text-gray-800">{dish.name}</h3>
            <p className="text-sm text-gray-500 mt-1">
              ₹{(dish.price ?? dish.defaultPrice ?? 0) / 100}
            </p>
          </div>
        ))}
      </div>

      {error && (
        <p className="text-center text-red-500 mt-4 font-medium">{error}</p>
      )}
    </div>
  );
};

export default RestaurantMenu;
