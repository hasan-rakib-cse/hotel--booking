import React from 'react';
import { Link, NavLink } from 'react-router-dom';
import './Header.css';
import header from '../../images/header.png';
import logo from '../../images/icons/logo.png';

const Header = () => {
    return (
        <div style={{ backgroundImage: `linear-gradient( rgba(0, 0, 0, 0.5), rgba(0, 0, 0, 0.5) ), url(${header})` }} className="header">
            <nav className="nav">
                <ul>
                    <li><img className="logo" src={logo} alt=""/></li>
                    <li><NavLink to={'/'} className='navlink'>Home</NavLink></li>
                    <li><NavLink to={'/login'} className='navlink'>Login</NavLink></li>
                    <li><NavLink to={'/book'} className='navlink btn-book'>Book</NavLink></li>
                </ul>
            </nav>
            <div className="title-container">
                <h1>Burj Al Arab</h1>
                <h2>A global icon of Arabian luxury</h2>
            </div>
        </div>
    );
};

export default Header;