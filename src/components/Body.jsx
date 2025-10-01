import Shimmer from "./Shimmer";
import {useState} from "react";

const Body = () =>{
        const [text, setText] = useState("");
        return(
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

                        <div className='restaurant-list'>
                                <div className='restaurant-card'>
                                        <img className='restaurant-logo' src = "https://media-assets.swiggy.com/swiggy/image/upload/fl_lossy,f_auto,q_auto,w_660/6deb3e554f32ea3395b2f7ea1d815751"/>
                                        <h3> New Peacock </h3>
                                        <h4> Indian, Chinese, Asian </h4>
                                        <h4> 4.3 Rating </h4>
                                </div>
                                <div className='restaurant-card'>
                                        <img className='restaurant-logo' src = "https://media-assets.swiggy.com/swiggy/image/upload/fl_lossy,f_auto,q_auto,w_660/FOOD_CATALOG/IMAGES/CMS/2024/5/7/e626d86e-7158-4b2c-9eb1-cd0c1eea32e8_dfaaad93-7af8-4651-a3df-d69055262352.jpeg"/>
                                        <h3> Mythri </h3>
                                        <h4> Indian, Japanese, Korean</h4>
                                        <h4> 4.5 Rating </h4>
                                </div>
                                <div className='restaurant-card'>
                                        <img className='restaurant-logo' src = "https://media-assets.swiggy.com/swiggy/image/upload/fl_lossy,f_auto,q_auto,w_660/FOOD_CATALOG/IMAGES/CMS/2025/6/5/93b60a3f-700f-434a-bea8-18ee0f752752_5be93588-0a50-4d85-8a2f-7440eb2fea9c.jpg"/>
                                        <h3> Paradise </h3>
                                        <h4> Indian, Mughlai, Biryani </h4>
                                        <h4> 3.7 Rating </h4>
                                </div>
                                
                        </div>
                </div>
        );
}; 

export default Body;