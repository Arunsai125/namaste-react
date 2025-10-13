import {useState} from "react";

const User = (props) =>{
    const{name, location, role} = props;

    return (
        <div className = "user-comp">
            <h1> {name}</h1>
            <h2> {location}</h2>
            <h3>{role}</h3>
            
        </div>
    );
}

export default User;