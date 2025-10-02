import ReactDOM from 'react-dom/client';
import Header from './src/components/Header';
import Body from './src/components/Body';
import Footer from './src/components/Footer';
import {createBrowserRouter, RouterProvider} from "react-router-dom";
import About from "./src/components/About";
import Contact from "./src/components/Contact";
import Error from "./src/components/Error"

                                         

const App = () =>{
        return(
                <div> 
                        <Header/>
                        <Body/>
                        <Footer/>
                </div>
        );
};

const appRouter = createBrowserRouter([
        { path:"/", element:<App/>, errorElement:<Error />},
        {path:"/about", element:<About/>},
        {path:"/contact", element:<Contact/>}
]);

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(<RouterProvider router={appRouter} />)
