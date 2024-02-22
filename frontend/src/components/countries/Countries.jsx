import { getStrapiURL } from '../../utils/api'
import './countries.css'

export default function Countries({ countries }) {
    return (
        <div className='grid-container flag-container'>
            {countries.map((country) => {
                return (
                    <div className='country' key={country.id}>
                        <div className='country__flag'>
                            <a href={country.url} target="_blank" rel="noreferrer">
				{
				country?.flag?.data?.attributes ? 
                                <img className='flag-img'
                                    src={getStrapiURL(country.flag.data.attributes?.url)}
                                    alt={`${country.name}`}>
                                </img> : <p>no image</p>
				}
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
