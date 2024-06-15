import CustomBlocksRenderer from "./CustomBlocksRenderer";

export default function AlertMessage({ message }) {
    return (<div className="alert-message">
        <CustomBlocksRenderer content={message[0].TextInstance}/>
    </div>)
}