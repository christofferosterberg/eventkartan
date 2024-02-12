import { GoogleMap, LoadScript, Marker, InfoWindow, useJsApiLoader } from '@react-google-maps/api';
import { useCallback, useState } from 'react';
import { EventType } from '../Types/EventType';
import React from 'react';

interface MapProps {
    events: EventType[],
}

function Map({ events }: MapProps) {

    const containerStyle = {
        height: '100%',
        width: '100%',
    };

    const center = {
        lat: 57.708870,
        lng: 11.974560,
    };

    // const markers = [
    //     { id: 1, position: { lat: 57.708870, lng: 11.974560 }, content: 'Marker content' },
    //     // Add more markers as needed
    // ];

    // const [markers, setMarkers] = useState<EventType | null>(null);

    const { isLoaded } = useJsApiLoader({
        id: 'google-map-script',
        googleMapsApiKey: "AIzaSyBLUdn5XTY8hn64Wr2fTw6UwaL-fdGcrj4"
    })

    const [map, setMap] = useState(null)

    const onLoad = useCallback(function callback(map: any) {
        // This is just an example of getting and using the map instance!!! don't just blindly copy!
        const bounds = new window.google.maps.LatLngBounds(center);
        // map.fitBounds(bounds);

        setMap(map)
    }, [])

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

    return isLoaded ? (
        <GoogleMap
            mapContainerStyle={containerStyle}
            center={center}
            zoom={13}
            onLoad={onLoad}
            onUnmount={onUnmount}
        >
            {events.map((event) => (
                <Marker
                    // key={marker.id}
                    position={event.position}
                    onClick={() => handleMarkerClick(event)}
                // Add any other Marker options as needed
                />
            ))}
            {selectedMarker && (
                <InfoWindow
                    position={selectedMarker.position}
                    onCloseClick={handleInfoWindowClose}
                >
                    <div>
                        <h3>{selectedMarker.title}</h3>
                    </div>
                </InfoWindow>
            )}
            { /* Child components, such as markers, info windows, etc. */}
            <></>
        </GoogleMap>
    ) : <></>
}

export default Map