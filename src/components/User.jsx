import {useState} from "react";

const User = (props) =>{
    const{name, location, role} = props;
    const [count1, setCount1] = useState(0);
    const [count2, setCount2] = useState(1);
    return (
        <div className = "user-comp">
            <h1> {name}</h1>
            <h2> {location}</h2>
            <h3>{role}</h3>
            <button onClick={()=>{
                setCount1(count1+1);
                setCount2(count2+1);
            }}>Increment Counter</button>
            <h4>{count1}</h4>
            <h4>{count2}</h4>
        </div>
    );
}

export default User;