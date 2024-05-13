
type EventType = {
    title: string;
    description: string;
};
interface TimelineEventProps {
    event: EventType
    index: number
}

const TimelineEvent: React.FC<TimelineEventProps> = ({ event, index }) => {
    return (
        <div
            className="flex items-center mb-8 ml-4 mr-4 relative z-10"
        >
            <div className="rounded-full bg-gray-300 h-8 w-8 flex items-center justify-center">
                <span className="text-sm font-semibold">{index + 1}</span>
            </div>
            <div className="ml-4">
                <h2 className="text-lg font-semibold">{event.title}</h2>
                <p className="text-gray-600">{event.description}</p>
            </div>
        </div>
    )
}

export default TimelineEvent;