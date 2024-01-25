import { GoogleMap, LoadScript, Marker, InfoWindow, useJsApiLoader } from '@react-google-maps/api';
import { useCallback, useState } from 'react';

function Map() {

    const containerStyle = {
        height: '100%',
        width: '100%',
    };

    const center = {
        lat: 57.708870,
        lng: 11.974560,
    };

    const markers = [
        { id: 1, position: { lat: 57.708870, lng: 11.974560 }, content: 'Marker 1 Content' },
        // Add more markers as needed
    ];

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

    const handleMarkerClick = (marker: any) => {
        setSelectedMarker(marker);
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
            {markers.map((marker) => (
                <Marker
                    key={marker.id}
                    position={marker.position}
                    onClick={() => handleMarkerClick(marker)}
                // Add any other Marker options as needed
                />
            ))}
            {selectedMarker && (
                <InfoWindow
                    position={selectedMarker.position}
                    onCloseClick={handleInfoWindowClose}
                >
                    <div>
                        <h3>{selectedMarker.content}</h3>
                    </div>
                </InfoWindow>
            )}
            { /* Child components, such as markers, info windows, etc. */}
            <></>
        </GoogleMap>
    ) : <></>
}

export default Map