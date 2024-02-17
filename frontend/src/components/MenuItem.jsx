import { useEffect, useState } from 'react';
import { NavLink } from 'react-router-dom';
import fetchAPI from '../utils/api';
import { RiArrowDownSLine } from '@remixicon/react';

export default function MenuItem({ slug, name, handleClick, isActive, closeMenu }) {
    const [menuChildren, setMenuChildren] = useState([]);
    const [error, setError] = useState(null);
    const [loading, setLoading] = useState(true);

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
                        className="nav__link single"
                        data-slug={menuChildren[0]?.page?.data?.attributes?.slug || ''}
                        to={menuChildren[0]?.page?.data?.attributes?.slug || ''}
                        key={menuChildren[0]?.page?.data?.attributes?.slug || ''}
                        onClick={closeMenu}>
                        {name}
                    </NavLink>
                </li>
            ) : (
                <li
                    className='dropdown__item'
                >
                    <div
                        onClick={(e)=>handleClick(e)}
                        className="nav__link"
                        data-slug={slug}
                        key={slug}>
                        {name}
                        <RiArrowDownSLine className={`dropdown__arrow ${isActive ? 'active' : ''}`} />
                    </div>

                    <ul className={`dropdown__menu ${isActive ? 'active' : ''}`} >
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
                                        onClick={closeMenu}>
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
