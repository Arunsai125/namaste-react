import {useRouteError} from "react-router-dom";

const Error = () =>{
    const err = useRouteError();
    return(
        <div className="text-center m-10 p-4  bg-amber-500">
            <h1>OOPS, You've ran into an invalid source</h1>
            <h3 >{err.status} :  {err.statusText}</h3>
            <h5>{err.data}</h5>
        </div>
    );
}

export default Error;
