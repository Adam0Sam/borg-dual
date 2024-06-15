import { getStrapiURL } from '../../utils/api';

import CustomBlocksRenderer from '../CustomBlocksRenderer';

import './infoRow.css';

export default function InfoRow({ infoRow }) {
    return (
        <div className={`info-row ${infoRow.reverse ? 'row-reverse' : ''}`}>
            {infoRow.InfoColumn.map((info) => {
                return (
                    <div className='info-column' key={info.id}>
                        <div className='info-text'>
                            <h3>{info.name}</h3>
                            <CustomBlocksRenderer content={info.TextInstance} />
                        </div>
                        <div className='info-image'>
                            <img
                                src={getStrapiURL(info.image.data.attributes?.url)}
                                alt={`${info.name}`}>
                            </img>
                        </div>
                    </div>
                )
            })}
        </div>
    )
}

