import CustomBlocksRenderer from "../CustomBlocksRenderer"
import './richText.css'

export default function RichText({ text, title, isSectioned }) {

    const richContent =
        <>
            {text.map((element) => {
                if(isSectioned){
                    const sectionTitle = element?.TextInstance[0]?.children[0]?.text;
                    const formattedTitle = sectionTitle?.replace(/\s/g, '-');
                    return (
                        <section className={`rich-wrapper id-${element.id}`} id={formattedTitle || element.id} key={element.id} >
                            <CustomBlocksRenderer
                                content={element.TextInstance}
                            />
                        </section>
                    )
                }
                return (
                    <div className={`rich-wrapper`} key={element.id} >
                        <CustomBlocksRenderer
                            content={element.TextInstance}
                        />
                    </div>
                )
            })}
        </>

    return (
        <>
            <h1>{title}</h1>
            {richContent}
        </>
    )
}