import RichText from "../rich-text/RichText"

export default function Events({ events }) {
    return (
        <div>
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
