import CustomBlocksRenderer from "./CustomBlocksRenderer"

export default function RichText({ text }) {
    return (
        <>
            {text.map((element) => {
                return (
                    <>
                        <CustomBlocksRenderer
                            content={element.TextInstance}
                        />
                        <br></br>
                        <p>-----------------------------------</p>
                    </>
                )
            })}
        </>
    )
}