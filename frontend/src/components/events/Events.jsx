import RichText from "../rich-text/RichText"

// is this component necessary or should it be merged with the RichText component?

export default function Events({ events }) {

    events = events.reverse();

    return (
        <div className="rich-container m-top">
            {
                events.map((event) => {
                    return (
                        <RichText
                            text={event.RichText}
                            title={event.year}
                        />
                    )
                })
            }
        </div>
    )
}
