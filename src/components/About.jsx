import User from "./User";
import UserClass from "./UserClass";

const About = () =>{
    return(
        <div className="about-comp">
            <h1> About Us !</h1>
            <p>We are a leading food delivery app with over 50,000 active users world wide. 
                You'll get 50% off on each order for a life time with an additional 50% imposed tarrifs 
                on each delivery for a lifetime.
                Hurry Up !!</p>
                <User name={"Arun Sai Narla"} location = {"Orlando"} role={"Software Engineer"}/>
                <br/>
                <UserClass name={"Arun Sai Narla"} location = {"Orlando"} role={"Software Engineer"}/>
        </div>
    );
}

export default About;