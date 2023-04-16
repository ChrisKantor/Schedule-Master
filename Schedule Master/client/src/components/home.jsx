import "./HomeStyles.css";
import "./Navbar"
import Navbar from "./Navbar";

function Home() {
    return (
        <div className="home">
            <Navbar>
            </Navbar>


            <div class="grid-container">
                <a href="/selection">
                <div class="courseOption">Course Menu
                <i className="fa-solid fa-list"></i>
                </div>
                </a>
                <div class="cartOption">Cart
                <img className = 'cart' src="https://www.citypng.com/public/uploads/small/11640441682j3enmxsqxkzywbh2ojg3uwslf0sm18kpkejhygv7av0ifhqjuf9sk9elom7rk4xg9xykmobez6kfzpf7k2tpkc9tf9sdg6zbhgoq.png"></img>
                </div>
            </div>
        </div>
    )
}

export default Home;