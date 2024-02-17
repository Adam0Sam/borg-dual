import CustomBlocksRenderer from "../CustomBlocksRenderer"
import './richText.css'

export default function RichText({ text, title }) {
    return (
        <>
            <h1>{title}</h1>
            {text.map((element) => {
                return (
                    <div className="rich-wrapper" key={element.id}>
                        <CustomBlocksRenderer
                            content={element.TextInstance}
                        />
                    </div>
                )
            })}
        </>
    )
}