import { useMemo, useRef, useState } from 'react';
import { EventType } from '../Types/EventType';
import {
    APIProvider,
    AdvancedMarker,
    Map,
    InfoWindow,
    useAdvancedMarkerRef
} from '@vis.gl/react-google-maps';

interface HomeMapProps {
    events: EventType[],
}
type LatLngLiteral = google.maps.LatLngLiteral

function HomeMap({ events }: HomeMapProps) {

    const center = useMemo<LatLngLiteral>(() => ({ lat: 57.708870, lng: 11.974560, }), []);
    // const [activeMarker, setActiveMarker] = useState<google.maps.marker.AdvancedMarkerElement | null>(null)
    const [clickedEvent, setClickedEvent] = useState<EventType | null>(null)

    const [markerRef, marker] = useAdvancedMarkerRef();
    const [infowindowShown, setInfowindowShown] = useState(false);

    const toggleInfoWindow = (e: any) => {

        console.log(e)
        setInfowindowShown(previousState => !previousState);
    }

    const closeInfoWindow = () => setInfowindowShown(false);


    function handleMarkerClick(event: EventType): void {
        console.log("get")
        setClickedEvent(event)
        setInfowindowShown(true);
    }

    return (
        <div style={{ height: "100vh", width: "100%" }}>
            <APIProvider apiKey="AIzaSyBLUdn5XTY8hn64Wr2fTw6UwaL-fdGcrj4">
                <Map
                    defaultCenter={center}
                    defaultZoom={13}
                    mapId={"46f0ccb2e50d127e"}
                    disableDefaultUI={true}
                    clickableIcons={false}
                >
                    {events.map((event) => (
                            <AdvancedMarker
                                key={event.id}
                                // ref={markerRef}
                                // onClick={toggleInfoWindow}
                                onClick={() => handleMarkerClick(event)}
                                position={{ lat: event.latitude, lng: event.longitude }}
                            >
                            </AdvancedMarker>
                    ))}
                    {infowindowShown && clickedEvent && (
                        <InfoWindow position={{lat:clickedEvent.latitude+0.001, lng: clickedEvent.longitude}} onCloseClick={closeInfoWindow}>
                            <h2>{clickedEvent.title}</h2>
                            {/* <p>This is an Info Window</p> */}
                        </InfoWindow>
                    )}
                </Map>
            </APIProvider>
        </div >
    )
}

export default HomeMap