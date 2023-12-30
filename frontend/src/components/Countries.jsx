import { getStrapiURL } from '../utils/api'

export default function Countries({ countries }) {
    return (
        <>
            {countries.map((country) => {
                return (
                    <>
                        <div>
                            <h4>{country.name}</h4>
                            <p>{country.info}</p>
                            <a href={`http://${country.url}`} target="_blank" rel="noreferrer">
                                <img
                                    src={getStrapiURL(country.flag.data.attributes?.url)}
                                    alt={`${country.name}`}>
                                </img>
                            </a>
                        </div>
                        <p>-----------------------------</p>
                    </>
                )
            })}
        </>
    )
}