import { useMemo, useState } from 'react';
import { EventType } from '../Types/EventType';
import { 
    APIProvider, 
    AdvancedMarker, 
    Map 
} from '@vis.gl/react-google-maps';

interface HomeMapProps {
    events: EventType[],
}

type LatLngLiteral = google.maps.LatLngLiteral

function HomeMap({ events }: HomeMapProps) {

    const center = useMemo<LatLngLiteral>(() => ({ lat: 57.708870, lng: 11.974560, }), []);

    const [isLoaded, setLoaded] = useState(true)


    const [selectedMarker, setSelectedMarker] = useState<any>(null);

    const handleMarkerClick = (event: any) => {
        setSelectedMarker(event);
    };

    const handleInfoWindowClose = () => {
        setSelectedMarker(null);
    };

    if (!isLoaded) {
        return <div>Loading ...</div>;
    }
    return isLoaded ? (
        <div style={{height: "100vh", width: "100%"}}>
            <APIProvider apiKey="AIzaSyBLUdn5XTY8hn64Wr2fTw6UwaL-fdGcrj4">
                <Map
                    defaultCenter={center}
                    defaultZoom={13}
                    mapId={"46f0ccb2e50d127e"}
                    disableDefaultUI={true}
                    clickableIcons={false}
                >
                    <Markers events={events} />
                </Map>
            </APIProvider>
        </div >
    ) : <></>
}

export default HomeMap

type Props = { events: EventType[] }

const Markers = ({ events }: Props) => {
    return <>
        {events.map((event) => (
            <AdvancedMarker position={{ lat: event.latitude, lng: event.longitude }} key={event.id}></AdvancedMarker>
        ))}
    </>
}