import ReactDOM from 'react-dom/client';
import {lazy, Suspense} from "react";
import Header from './src/components/Header';
import Body from './src/components/Body';
import Footer from './src/components/Footer';
import {createBrowserRouter, RouterProvider, Outlet} from "react-router-dom";
import About from "./src/components/About";
import Contact from "./src/components/Contact";
import Error from "./src/components/Error"
import RestaurantMenu from './src/components/RestaurantMenu';
import Cart from "./src/components/Cart";
                                         
const Grocery = lazy(() => import("./src/components/Grocery"));

const App = () =>{
        return(
                <div> 
                        <Header/>
                        <Outlet />
                        <Footer/>
                </div>
        );
};

const appRouter = createBrowserRouter([
        { path:"/", element:<App/>, errorElement:<Error />,
                children:[
                        {path:"/", element: <Body/>},
                        {path:"/about", element: <About/>},
                        {path:"/contact", element:<Contact/>},
                        {path:"/restaurant/:resId", element:<RestaurantMenu />},
                        {path:"/cart", element:<Cart/>},
                        {path:"/grocery", element:(<Suspense fallback={<h1>Loading...</h1>}><Grocery/></Suspense>)}
                ]
        },
]);

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(<RouterProvider router={appRouter} />)
