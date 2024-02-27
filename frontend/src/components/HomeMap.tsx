import {
    GoogleMap,
    useLoadScript,
    Marker,
    MarkerClusterer,
    InfoWindow,
} from '@react-google-maps/api';
import { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import { EventType } from '../Types/EventType';
import React from 'react';
import { APIProvider, AdvancedMarker, Map } from '@vis.gl/react-google-maps';

interface HomeMapProps {
    events: EventType[],
}

type LatLngLiteral = google.maps.LatLngLiteral
type DirectionsResult = google.maps.DirectionsResult
type MapOptions = google.maps.MapOptions

function HomeMap({ events }: HomeMapProps) {

    const mapRef = useRef<GoogleMap>()
    const center = useMemo<LatLngLiteral>(() => ({ lat: 57.708870, lng: 11.974560, }), []);
    const options = useMemo<MapOptions>(() => ({
        disableDefaultUI: false,
        clickableIcons: false,
    }), [])

    // const onLoad = useCallback((map: any) => {
    //     mapRef.current = map
    //     setLoaded(true)
    // }, [])

    // const { isLoaded } = useLoadScript({
    //     googleMapsApiKey: "AIzaSyBLUdn5XTY8hn64Wr2fTw6UwaL-fdGcrj4",
    //     // libraries: ['places']
    // })

    const [isLoaded, setLoaded] = useState(true)


    // const markers = [
    //     { id: 1, position: { lat: 57.708870, lng: 11.974560 }, content: 'Marker content' },
    //     // Add more markers as needed
    // ];

    // const [markers, setMarkers] = useState<EventType | null>(null);



    // const [map, setMap] = useState(null)

    // const onLoad = useCallback(function callback(map: any) {
    //     // This is just an example of getting and using the map instance!!! don't just blindly copy!
    //     const bounds = new window.google.maps.LatLngBounds(center);
    //     // map.fitBounds(bounds);

    //     setMap(map)
    // }, [])

    // const onUnmount = useCallback(function callback() {
    //     setMap(null)
    // }, [])

    const [selectedMarker, setSelectedMarker] = useState<any>(null);

    const handleMarkerClick = (event: any) => {
        setSelectedMarker(event);
    };

    const handleInfoWindowClose = () => {
        setSelectedMarker(null);
    };

    // useEffect(() => {
    //     console.log(events)
    // }, [events])

    if (!isLoaded) {
        return <div>Loading ...</div>;
    }
    return isLoaded ? (
        <div className='outer-map-container'>
            <APIProvider apiKey="AIzaSyBLUdn5XTY8hn64Wr2fTw6UwaL-fdGcrj4">
                <Map 
                center={center} 
                zoom={13} 
                mapId={"46f0ccb2e50d127e"}
                clickableIcons={false}
                disableDefaultUI={true}
                >
                    <Markers events={events} />
                </Map>
            </APIProvider>
            {/* <div className='controls'></div> */}
            {/* <div className='map'>
                <GoogleMap
                    zoom={13}
                    center={center}
                    options={options}
                    mapContainerClassName='map-container'
                    onLoad={onLoad}
                > */}
            {/* <Marker position={{ lat: 57.708870, lng: 11.974560 }} /> */}

            {/* {(events?.length ?? 0) > 0 && (
                        events.map((event) => (
                            <Marker position={{ lat: event.latitude, lng: event.longitude}} />

                        ))
                    )}

                </GoogleMap>
            </div> */}
        </div>
    ) : <></>
}

export default HomeMap

type Props = { events: EventType[] }

const Markers = ({ events }: Props) => {
    return <>
        {events.map((event) => (
            <AdvancedMarker position={{ lat: event.latitude, lng: event.longitude }}key={event.id}></AdvancedMarker>
        ))}
    </>
}