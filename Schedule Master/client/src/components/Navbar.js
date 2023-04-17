import { Component} from "react";
import {MenuData} from "./MenuData";
import "./NavbarStyles.css";
import { Link } from "react-router-dom";

class Navbar extends Component
{
    render()
    {
        return(
            <nav className = "NavbarItems">
                <h2 className="logo">
                    Schedule Master
                    <i className = "fab fa-react"></i>
                </h2>
                <ul className="navmenu">
                    {MenuData.map((item, index)=>{
                        return(
                            <li key={index}>
                                {/* <a href={item.url} className={item.cName}>
                                    <i className = {item.icon}></i>
                                    {item.title}
                                </a> */}

                                <Link to={item.url} className={item.cName} state={{currentCart: this.props.currentCart}}>
                                    <i className = {item.icon}></i>
                                    {item.title}
                                </Link>
                            </li>
                        )
                    })}
                    
                </ul>
            </nav>
        );
    }
}

export default Navbar;