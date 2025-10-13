import {useState, useEffect} from "react";

const useRestaurantInfo = ()=>{

  const [listOfRestaurants, setListOfRestaurants] = useState([]);
  const [filteredRestaurants, setFilteredRestaurants] = useState([]);
  useEffect( () => {fetchData();}, []);
    const fetchData = async () =>{
        const data = await fetch("https://corsproxy.io/?https://www.swiggy.com/dapi/restaurants/list/v5?lat=17.4236771&lng=78.3452597&is-seo-homepage-enabled=true&page_type=DESKTOP_WEB_LISTING");
        const jsonData = await data.json();
        const restaurants = jsonData?.data?.cards?.[4]?.card?.card?.gridElements?.infoWithStyle?.restaurants || [];
        setListOfRestaurants(restaurants);
        setFilteredRestaurants(restaurants);
    };
    return {listOfRestaurants, filteredRestaurants, setFilteredRestaurants };

};

export default useRestaurantInfo;