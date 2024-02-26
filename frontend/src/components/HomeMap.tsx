import {
    GoogleMap,
    useLoadScript,
    Marker,
    MarkerClusterer,
    InfoWindow,
} from '@react-google-maps/api';
import { useCallback, useMemo, useRef, useState } from 'react';
import { EventType } from '../Types/EventType';
import React from 'react';

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
        disableDefaultUI: true,
        clickableIcons: false
    }), [])

    const onLoad = useCallback((map:any) => (mapRef.current = map), [])


    // const markers = [
    //     { id: 1, position: { lat: 57.708870, lng: 11.974560 }, content: 'Marker content' },
    //     // Add more markers as needed
    // ];

    // const [markers, setMarkers] = useState<EventType | null>(null);

    const { isLoaded } = useLoadScript({
        googleMapsApiKey: "AIzaSyBLUdn5XTY8hn64Wr2fTw6UwaL-fdGcrj4",
        libraries: ['places']
    })

    const [map, setMap] = useState(null)

    // const onLoad = useCallback(function callback(map: any) {
    //     // This is just an example of getting and using the map instance!!! don't just blindly copy!
    //     const bounds = new window.google.maps.LatLngBounds(center);
    //     // map.fitBounds(bounds);

    //     setMap(map)
    // }, [])

    const onUnmount = useCallback(function callback() {
        setMap(null)
    }, [])

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
        <div className='container'>
            {/* <div className='controls'></div> */}
            <div className='map'>
                <GoogleMap
                    zoom={13}
                    center={center}
                    options={options}
                    mapContainerClassName='map-container'
                    onLoad={onLoad}
                >
                </GoogleMap>
            </div>
        </div>
        // <GoogleMap
        //     mapContainerStyle={containerStyle}
        //     center={center}
        //     zoom={13}
        //     onLoad={onLoad}
        //     onUnmount={onUnmount}
        // >
        //     {events.map((event) => (
        //         <Marker
        //             key={event.id}
        //             position={{
        //                 lat: event.latitude,
        //                 lng: event.longitude
        //             }}
        //             onClick={() => handleMarkerClick(event)}
        //         // Add any other Marker options as needed
        //         />
        //     ))}
        //     {selectedMarker && (
        //         <InfoWindow
        //             position={selectedMarker.position}
        //             onCloseClick={handleInfoWindowClose}
        //         >
        //             <div>
        //                 <h3>{selectedMarker.title}</h3>
        //             </div>
        //         </InfoWindow>
        //     )}
        //     { /* Child components, such as markers, info windows, etc. */}
        //     <></>
        // </GoogleMap>
    ) : <></>
}

export default HomeMap