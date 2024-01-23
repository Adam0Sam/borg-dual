import { useEffect, useState, useRef, forwardRef } from 'react';
import { NavLink } from 'react-router-dom';
import fetchAPI from '../utils/api';
import { RiArrowDownSLine } from '@remixicon/react';

export default function MenuItem({ slug, name, toggleClick }) {
    const [menuChildren, setMenuChildren] = useState([]);
    const [error, setError] = useState(null);
    const [loading, setLoading] = useState(true);
    // a hack to get to arrowContaineRef. fix later
    const arrowContaineRef = useRef(null);
    const dropdownRef = useRef(null);

    const fetchMenuChildren = async (slug) => {
        try {
            const response = await fetchAPI(`/api/navigation-collections/${slug}`);
            const childArray = response.data.attributes.NavLink;
            if (childArray.length === 0) {
                setError('No children found');
            }
            else {
                setMenuChildren(childArray);
                setLoading(false);
            }
        }
        catch (err) {
            setError(err.status);
        }

    }

    useEffect(() => {
        fetchMenuChildren(slug);
    }, [slug]);

    const showMenu = () => {
        if(!dropdownRef.current || !arrowContaineRef.current) return;
        dropdownRef.current.classList.toggle('active');
        arrowContaineRef.current.querySelector('.dropdown__arrow').classList.toggle('active');
    }


    if (error) {
        return (
            <li className="error nav-error">Something went wrong. {error}</li>
        )
    }
    
    if (loading) {
        return (
            <li className="nav nav-error">Loading...</li>
        )
    }


    return (
        <>
            {menuChildren.length === 1 ? (
                <li>
                    <NavLink
                        className="nav__link"
                        data-slug={menuChildren[0]?.page?.data?.attributes?.slug || ''}
                        to={menuChildren[0]?.page?.data?.attributes?.slug || ''}
                        key={menuChildren[0]?.page?.data?.attributes?.slug || ''}
                        onClick={toggleClick}>
                        {name}
                    </NavLink>
                </li>
            ) : (
                <li
                    className='dropdown__item'
                    onClick={showMenu}
                >
                    <div
                        className="nav__link"
                        data-slug={slug}
                        key={slug}
                        ref={arrowContaineRef}>
                        {name}
                        <RiArrowDownSLine className='dropdown__arrow'/>
                    </div>

                    <ul className='dropdown__menu' ref={dropdownRef}>
                        {menuChildren.map((child) => {
                            const childName = child.name;
                            const childSlug = child?.page?.data?.attributes?.slug || '';

                            return (
                                <li key={childSlug}>
                                    <NavLink
                                        key={childSlug}
                                        className="dropdown__link"
                                        data-slug={childSlug}
                                        to={childSlug}
                                        onClick={toggleClick}>
                                        {childName}
                                    </NavLink>
                                </li>
                            )
                        })}
                    </ul>
                </li>
            )}
        </>
    );

}
