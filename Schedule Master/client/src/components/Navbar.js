import { Component} from "react";
import {MenuData} from "./MenuData";
import "./NavbarStyles.css";

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
                                <a href={item.url}
                                className={item.cName}>
                                    <i className = {item.icon}></i>
                                    {item.title}
                                </a>
                            </li>
                        )
                    })}
                    
                </ul>
            </nav>
        );
    }
}

export default Navbar;