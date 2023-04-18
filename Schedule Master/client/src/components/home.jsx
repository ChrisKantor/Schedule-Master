import "./HomeStyles.css";
import "./Navbar"
import Navbar from "./Navbar";
import { useState, useEffect} from "react";
import { Link, useLocation } from "react-router-dom";
import { useAuth } from "../firebase";

function Home(props) {
    //used to represent the cart
    const [cartSelection, setCartSelection] = useState([]);

    const location = useLocation();

    //current Cart selection, use to access the array
    const saveCart = () => {
        console.log("Current Cart: " + location.state.currentCart);
        setCartSelection(location.state.currentCart);
    }

    useEffect( () => {
        if (location.state !== null)
        {
            saveCart();
        }
        else
        {
            console.log("Cart is empty");
        }
    }, []);
    
    const currentUser = useAuth();

    return (
        <div className="home">
            <Navbar currentCart={cartSelection}>
            </Navbar>

            <div className="grid-container">

                <Link to="/selection" state={{currentCart: cartSelection}}>
                    <div className="courseOption">Course Menu
                        <i className="fa-solid fa-list"></i>
                    </div>
                </Link>

                <Link to="/cart" state={{currentCart: cartSelection}}>
                    <div className="cartOption">Cart
                        <img className = 'cart' src="https://www.citypng.com/public/uploads/small/11640441682j3enmxsqxkzywbh2ojg3uwslf0sm18kpkejhygv7av0ifhqjuf9sk9elom7rk4xg9xykmobez6kfzpf7k2tpkc9tf9sdg6zbhgoq.png"></img>
                    </div>
                </Link>
            </div>

            <div className="authorization">Currently logged in as: {currentUser?.email}</div>
        </div>
    )
}

export default Home;