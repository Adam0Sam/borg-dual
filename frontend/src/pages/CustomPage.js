import { useParams } from "react-router-dom";
import { useState, useEffect } from "react";
import { BlocksRenderer } from '@strapi/blocks-react-renderer';

function RichTextComponent({ text }) {

    const addNewLine = (children) => {
        if (children.length === 0) {
            return true;
        }
        if (children.length === 1 && children[0].props.text.length === 0) {
            return true;
        }
    }

    return (
        <>
            {text.map((element) => {
                return (
                    <>
                        <BlocksRenderer
                            content={element.TextInstance}
                            blocks={{
                                paragraph: ({ children }) => {
                                    if (addNewLine(children)) {
                                        return <br></br>
                                    }
                                    return <p>{children}</p>
                                }
                            }}
                        />
                        <br></br>
                        <p>-----------------------------------</p>
                    </>
                )
            })}
        </>
    )

}

export default function CustomPage() {
    const params = useParams();
    const postSlug = params.slug;
    const [content, setContent] = useState([]);

    const fetchContent = async () => {
        const res = await fetch(`http://localhost:1337/api/pages/${postSlug}`);
        const obj = await res.json();
        setContent(obj.data.attributes);
        // console.log("page content: ", obj.data.attributes);
    }

    useEffect(() => {
        fetchContent();
    }, [postSlug])

    const hasRichText = (content) => {
        if (content.RichText?.length > 0) {
            return true;
        }
        return false;
    }

    const modifyArray = (textArray, type) => {
        switch (type) {
            case 'news':
                return [...textArray].reverse();
            default:
                return textArray;
        }
    }

    return (
        <div>
            <h1>{content.name}</h1>
            {hasRichText(content) && < RichTextComponent text={modifyArray(content.RichText, postSlug)} />}
        </div>
    )
}
