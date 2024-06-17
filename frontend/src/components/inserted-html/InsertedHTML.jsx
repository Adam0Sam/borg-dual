import './insertedHTML.css'

export default function InsertedHTML({ html }){
    return (
        <div className="container inserted-html-container m-top" dangerouslySetInnerHTML={{ __html: html }} />
    );
}