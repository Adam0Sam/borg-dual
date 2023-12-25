import { useState, useEffect, useRef } from 'react';
import { NavLink } from 'react-router-dom';
import MenuItem from './MenuItem'; // Import the MenuItem component

// from: https://remixicon.com/
import { RiHeartFill, RiMenuLine, RiCloseLine } from '@remixicon/react';

export default function MenuNav() {
    const [menuItems, setMenuItems] = useState([]);
    const navMenu = useRef(null);
    const navToggle = useRef(null);

    const fetchMenuItems = async () => {
        const response = await fetch('http://localhost:1337/api/navigation-collections');
        const obj = await response.json();
        console.log(obj.data);
        setMenuItems(obj.data);
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
                    <NavLink to='/' className="nav__logo">
                        <RiHeartFill
                        />
                        Home
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
                        {menuItems.map((item) => (
                            <MenuItem
                                key={item.attributes.slug}
                                slug={item.attributes.slug}
                                name={item.attributes.name}
                            />
                        ))}
                    </ul>
                </div>
            </nav>
        </header>
    )
}