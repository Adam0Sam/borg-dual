import { getStrapiURL } from '../utils/api';

import CustomBlocksRenderer from '../components/CustomBlocksRenderer';

export default function InfoRow({ infoRow, customClass }) {
    return (
        <div className={`info-row ${customClass}`}>
            {infoRow.map((info) => {
                return (
                    <div className='info-column'>
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
