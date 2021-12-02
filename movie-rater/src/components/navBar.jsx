import React from "react";
import {NavLink} from 'react-router-dom';

const NavBar = () => {
    return (
        <nav className="navbar navbar-light" id="navbar">

                <ul className="list-group list-group-horizontal list-unstyled ">
                    <li className="nav-item "><NavLink className="nav-link text-white" to="/home">Home</NavLink></li>
                    <li className="nav-item "><NavLink className="nav-link text-white" to="/movies">Movies</NavLink></li>
                    <li className="nav-item"><NavLink className="nav-link text-white" to="/about">About Us</NavLink></li>
                    <li className="nav-item"><NavLink className="nav-link text-white" to="/ConectUs">Conect US</NavLink></li>
                </ul>
        </nav>

    );
};
 
export default NavBar;
