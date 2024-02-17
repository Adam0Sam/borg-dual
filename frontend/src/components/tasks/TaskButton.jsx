import { getStrapiURL } from "../../utils/api"


export default function TaskButton({ example, isActive, handleClick }) {
    return (
        <button className={`task-button ${isActive ? 'active' : ''}`}>
            <img
                src={getStrapiURL(example.cover.data.attributes?.url)}
                alt={example.name}
                onClick={handleClick}>
            </img>
        </button>
    )
}