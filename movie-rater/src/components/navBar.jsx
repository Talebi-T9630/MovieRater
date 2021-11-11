import React from "react";
import {NavLink} from 'react-router-dom';

const NavBar = () => {
    return (
        <nav className="navbar navbar-expand-lg navbar-light bg-light">
            <div className="container-fluid">

                <ul className="navbar-nav">
                    <li className="nav-item"><NavLink className="nav-link" to="/home">Home</NavLink></li>
                    <li className="nav-item"><NavLink className="nav-link" to="/movies">Movies</NavLink></li>
                    <li className="nav-item"><NavLink className="nav-link" to="/about">About Us</NavLink></li>
                    <li className="nav-item"><NavLink className="nav-link" to="/ConectUs">Conect US</NavLink></li>
                </ul>
            </div>
        </nav>

    );
};
 
export default NavBar;
