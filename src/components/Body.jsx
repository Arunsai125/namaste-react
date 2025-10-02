import Shimmer from "./Shimmer";
import {useState, useEffect} from "react";

const Body = () =>{
        const [text, setText] = useState("");
        const [listOfRestaurants, setListOfRestaurants] = useState("");
         useEffect(() => { fetchData()}, []);
        const fetchData = async () =>{
                
                const data = await fetch("https://corsproxy.io/?https://www.swiggy.com/dapi/restaurants/list/v5?lat=17.4236771&lng=78.3452597&is-seo-homepage-enabled=true&page_type=DESKTOP_WEB_LISTING");
                const jsonData = await data.json();
                console.log(jsonData?.data?.cards[4]?.card?.card?.gridElements?.infoWithStyle?.restaurants);
               setListOfRestaurants(jsonData?.data?.cards[4]?.card?.card?.gridElements?.infoWithStyle?.restaurants);
                
        }
        return listOfRestaurants.length ===0 ? (<Shimmer />) :
        
        (
                <div className='body'>
                        <div className='search'>
                                <input type="text" placeholder='Search' />
                                <button className="search-btn" onClick={() => {alert("search clicked")}}> Go </button>
                        </div>
                        <div className="filter">     
                                <input type="text" className="input-field" value={text} onChange={(e)=>setText(e.target.value)}/>
                                <button className="filter-btn" onClick={
                                        ()=>{
                                                console.log('search results');
                                        }
                                }> Search  </button>        
                        </div>

                        <div className="restaurant-list">
                                {listOfRestaurants.map((restaurant) => (
                                        <div className="restaurant-card" key={restaurant.info.id}>
                                                <img className="restaurant-logo"
                                                src={"https://media-assets.swiggy.com/swiggy/image/upload/fl_lossy,f_auto,q_auto,w_660/" + restaurant.info.cloudinaryImageId}  alt={restaurant.info.name}/>
                                                <h3>{restaurant.info.name}</h3>
                                                <h4>{restaurant.info.cuisines.join(", ")}</h4>
                                                <h4>{restaurant.info.avgRating} ⭐</h4>
                                                <h4>{restaurant.info.areaName}</h4>
                                        </div>
                                        ))}
                        </div>
        </div>
        );
}; 

export default Body;