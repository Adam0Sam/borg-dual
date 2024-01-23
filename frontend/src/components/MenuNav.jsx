import { useState, useEffect, useRef } from 'react';
import { NavLink } from 'react-router-dom';
import MenuItem from './MenuItem'; // Import the MenuItem component
import fetchAPI from '../utils/api';

// from: https://remixicon.com/
import { RiMenuLine, RiCloseLine } from '@remixicon/react';

export default function MenuNav() {
    const [menuItems, setMenuItems] = useState([]);
    const navMenu = useRef(null);
    const navToggle = useRef(null);

    const fetchMenuItems = async () => {
        const data = await fetchAPI('/api/navigation-collections');
        setMenuItems(data.data);
    }

    useEffect(() => {
        fetchMenuItems();
    }, []);

    const handleToggleClick = (e) => {
        navMenu.current.classList.toggle('show-menu');
        navToggle.current.classList.toggle('show-icon');
    }

    return (
        <header className='header'>
            <nav className='nav container'>
                <div className='nav__data'>
                    <NavLink to='/' className='nav__logo'>
                        <img className='nav__logo-img' src='/logo.png'></img>
                        <h3 className='nav__logo-text'>
                            International Challenge on Informatics and Computational Thinking
                        </h3>
                    </NavLink>

                    <div className='nav__toggle' id='nav-toggle' ref={navToggle} onClick={handleToggleClick}>
                        <RiMenuLine
                            className='nav__burger'
                        />
                        <RiCloseLine
                            className='nav__close'
                        />
                    </div>
                </div>
                <div className='nav__menu' id='nav-menu' ref={navMenu}>
                    <ul className='nav__list'>
                        {menuItems.map((item) => {
                            console.log("item: ", item.attributes.slug);
                            return (
                                <MenuItem
                                    key={item.attributes.slug}
                                    slug={item.attributes.slug}
                                    name={item.attributes.name}
                                    toggleClick={handleToggleClick}
                                />
                            )
                        })}
                    </ul>
                </div>
            </nav>
        </header>
    )
}