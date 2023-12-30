import { getStrapiURL } from '../utils/api';

import CustomBlocksRenderer from '../components/CustomBlocksRenderer';

export default function InfoRow({ infoRow }){
    return (
        <div className='info-row-container'>
            {infoRow.map((info) => {
                return (
                    <div>
                        <h3>{info.name}</h3>
                        <CustomBlocksRenderer content={info.TextInstance} />
                        <img
                            src={getStrapiURL(info.image.data.attributes?.url)}
                            alt={`${info.name}`}>
                        </img>
                    </div>
                )
            })}
        </div>
    )
}
