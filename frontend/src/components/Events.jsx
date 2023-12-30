import RichText from "./RichText"

export default function Events({ events }) {
    return (
        <>
            {
                events.map((event) => {
                    return (
                        <>
                            <h3>{event.year}</h3>
                            <RichText
                                text={event.RichText}
                            />
                        </>
                    )
                })
            }
        </>
    )
}