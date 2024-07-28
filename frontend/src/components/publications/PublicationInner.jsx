import { useState, useEffect } from "react";
import RichText from "../rich-text/RichText";

export default function PublicationInner({ publicationLinks }) {
  const [publicationContent, setPublicationContent] = useState([]);
  const [activeButtonIndex, setActiveButtonIndex] = useState(0);

  useEffect(() => {
    setPublicationContent(
      publicationLinks[0].publication.data.attributes.RichText
    );
    setActiveButtonIndex(0);
  }, [publicationLinks]);

  const handleClick = (text, index) => {
    setPublicationContent(text);
    setActiveButtonIndex(index);
  };

  return (
    <>
      <div
        className={`publication__buttons inner-buttons ${
          publicationLinks.length > 1 ? "visible" : ""
        } `}
      >
        {publicationLinks.map((link, index) => (
          <button
            onClick={() => {
              handleClick(link.publication.data.attributes.RichText, index);
              console.log(link.publication.data.attributes.RichText);
            }}
            key={link.name}
            className={`pub-button inner-button ${
              index === activeButtonIndex ? "active" : ""
            }`}
          >
            {link.name}
          </button>
        ))}
        {
          <button
            onClick={() => {
              handleClick(
                publicationLinks
                  .map((link) => link.publication.data.attributes.RichText)
                  .flat(),
                publicationLinks.length
              );
            }}
            className={`pub-button inner-button ${
              publicationLinks.length === activeButtonIndex ? "active" : ""
            }`}
          >
            All
          </button>
        }
      </div>
      <RichText text={publicationContent} noPadding />
    </>
  );
}
