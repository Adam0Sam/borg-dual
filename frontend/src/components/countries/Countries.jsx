import { getStrapiURL } from '../../utils/api'
import './countries.css'

export default function Countries({ countries }) {
    return (
        <div className='grid-container flag-container'>
            {countries.map((country) => {
                console.log(country);
                return (
                    <div className='country' key={country.id}>
                        <div className='country__flag'>
                            <a href={country.url} target="_blank" rel="noreferrer">
                                <img className='flag-img'
                                    src={getStrapiURL(country.flag?.data?.attributes?.url)}
                                    alt={`${country.flag?.data ? country.name : 'No Flag Image'}`}>
                                </img>
                            </a>
                        </div>
                        <div className='country__info'>
                            <h4>{country.name}</h4>
                            <p>{country.info}</p>
                        </div>
                    </div>
                )
            })}
        </div>
    )
}
