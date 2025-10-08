import React from "react";

class UserClass extends React.Component{

    constructor(props){
        super(props);
        this.state={
            count1:0,
            count2:1
        }
    }
    
    componentDidMount(){
        console.log("The last stage :constructor -> render -> componentDidMount")
    }
    render(){
        const {name, location, role} = this.props;
        const {count1, count2} = this.state;
        return(
             <div className = "user-comp">
            <h1>{name}</h1>
            <h2> {location}</h2>
            <h3>{role}</h3>
            <h4>{count1}</h4>
            <h4>{count2}</h4>
            <button onClick={()=>{
                (this.setState({
                    count1 : this.state.count1 + 1,
                    count2 : this.state.count2 + 1
                }
                ))
            }}>Increment Counter</button>
        </div>
        )
    }
}

export default UserClass;