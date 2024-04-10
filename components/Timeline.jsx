import { useEffect, useState } from "react";
import TimelineEvent from "./TimelineEvent";
import { VerticalTimeline, VerticalTimelineElement } from 'react-vertical-timeline-component';
import supabase from "supabase"
import 'react-vertical-timeline-component/style.min.css';

// export type EventType = {
//     title: string;
//     description: string;
// };


const formatDate = (timestamp) => {
    const date = new Date(timestamp)
    var options = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' };
    return date.toLocaleDateString("en-US", options);
}

const TimelineElement = ({ event }) => {
    return (
        <VerticalTimelineElement
            className="vertical-timeline-element--work"
            contentStyle={{ background: 'rgba(163, 0, 0, 0.5)', color: '#fff' }}
            contentArrowStyle={{ borderRight: '7px solid  rgba(163, 0, 0, 0.5)' }}
            date={formatDate(event.date)}
            dateClassName={"xl:text-black"}
            iconStyle={{ background: '#8b0000', color: '#fff' }}
        >
            <h3 style={{ color: "black", fontWeight: "bold" }}>{event.name}</h3>
            <h4 className="vertical-timeline-element-subtitle">{event.location}</h4>
            <p >
                {event.description}
            </p>
        </VerticalTimelineElement >
    )

}

const Timeline = () => {
    const [events, setEvents] = useState([]);

    useEffect(() => {
        fetchRushEvents()
    }, [])

    async function fetchRushEvents() {
        try {
            const { data, error } = await supabase
                .from('RushEvents')
                .select("*")
            if (error) throw error
            if (data) setEvents(data);
        } catch (error) {
            console.error('Error fetching rush events:', error)
        }
    }

    return (
        <div className="bg-slate-200 m-2 flex flex-col justify-center items-center">
            <h1 className="text-3xl  font-bold z-3 pb-1"> Events </h1>
            <VerticalTimeline >
                {events.map((event, idx) => {
                    return <TimelineElement event={event} key={idx} />
                })}
            </VerticalTimeline >
        </div>

    )
}

export default Timeline
