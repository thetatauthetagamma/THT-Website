import TimelineEvent from "./TimelineEvent";

export type EventType = {
    title: string;
    description: string;
};

const Timeline = () => {
    const events: EventType[] = [
        {
            title: "Info Session: Central",
            description: "Come join us at blah blah blah"
        },
        {
            title: "Info Session: North",
            description: "yadayadayada"
        }
    ];

    return (
        <div className="flex flex-col relative w-full">
            <div className="absolute h-full border-l-2 border-gray-300 left-1/2"></div>
            {events.map((event, index) => (
                <div key={index}>
                    <TimelineEvent event={event} index={index} />
                </div>
            ))}
        </div>
    )
}

export default Timeline
