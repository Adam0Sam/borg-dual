import { getStrapiURL } from '../utils/api'

export default function Logos({ logos }) {
    return (
        <>
            {
                logos.map((logo) => {
                    return (
                        <>
                            <div>
                                <img
                                    src={getStrapiURL(logo.logo?.data?.attributes?.url)}
                                    alt={`${logo.name}`}>
                                </img>
                                <p>{logo.name}</p>
                            </div>
                            <p>-----------------------------</p>
                        </>
                    )
                })


            }
        </>
    )
}