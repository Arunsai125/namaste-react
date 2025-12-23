import { Link } from "react-router-dom";


const RestaurantCard = ({ restaurant }) => {
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
}

export const highlyRatedRestaurants = (RestaurantCard) =>{
    return (props) => {
        return(
            <div>
                <label className="absolute bg-black text-white p-2 m-2 rounded-sm">Higly Rated</label>
                <RestaurantCard {...props}/>
            </div>
        );
    }
}


export default RestaurantCard;