import { BlocksRenderer } from '@strapi/blocks-react-renderer';

// TODO: Add option to pass custom blocks/modifiers
export default function CustomBlocksRenderer({ content }) {

    const addNewRichTextLine = (children) => {
        if (children.length === 0) {
            return true;
        }
        if (children.length === 1 && children[0].props.text.length === 0) {
            return true;
        }
        return false;
    }

    return (
        <BlocksRenderer
            content={content}
            blocks={{
                paragraph: ({ children }) => {
                    if (addNewRichTextLine(children)) {
                        return <br></br>
                    }
                    return <p>{children}</p>
                }
            }}
        />
    )
}