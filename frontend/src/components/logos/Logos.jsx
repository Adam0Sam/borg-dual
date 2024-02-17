import { getStrapiURL } from '../../utils/api'
import './logos.css'

export default function Logos({ logos }) {
    return (
        <div className='grid-container logo-container'>
            {logos.map((logo) => {
                return (
                    <div className='logo' key={logo.id}>
                        <div className='logo__visual'>
                            <img className='logo__img'
                                src={getStrapiURL(logo.logo?.data?.attributes?.url)}
                                alt={`${logo.name}`}>
                            </img>
                        </div>
                        <p className='logo__name'>{logo.name}</p>
                    </div>
                )
            })}
        </div>
    )
}