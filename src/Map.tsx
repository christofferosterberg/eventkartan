import { GoogleMap, LoadScript } from '@react-google-maps/api';

function Map() {
    const mapStyles = {
        height: '100%',
        width: '100%',
    };

    const defaultCenter = {
        lat: 57.708870,
        lng: 11.974560,
    };

    return (
        <LoadScript googleMapsApiKey="AIzaSyBLUdn5XTY8hn64Wr2fTw6UwaL-fdGcrj4">
            <GoogleMap
                mapContainerStyle={mapStyles}
                zoom={8}
                center={defaultCenter}
            />
        </LoadScript>
    )
}

export default Map