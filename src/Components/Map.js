import React, {useState} from "react";
import {
    GoogleMap,
    withScriptjs,
    withGoogleMap,
    Marker,
    InfoWindow
} from 'react-google-maps';
import * as parksData from "./skateboard-parks.json";
import mapStyles from "./mapStyles";

function ChicagoMap() {

    const [selectedPark, setSelectedPark] = useState(null);

    return (
        <GoogleMap
            defaultZoom={10}
            defaultCenter={{lat:41.878113, lng:-87.629799}}
            defaultOptions={{styles: mapStyles}}
        >
            {parksData.features.map(park =>(
                <Marker
                    key={park.properties.PARK_ID}
                    position={{
                        lat: park.geometry.coordinates[1],
                        lng: park.geometry.coordinates[0]
                    }}
                    onClick={() => {
                        setSelectedPark(park);
                    }}
                    icon={{
                        url: '/marker_icon.png',
                        scaledSize: new window.google.maps.Size(25, 25)
                    }}
                />
            ))}

            {selectedPark && (
                <InfoWindow
                    position={{
                        lat: selectedPark.geometry.coordinates[1],
                        lng: selectedPark.geometry.coordinates[0]
                    }}

                    onCloseClick={() => {
                        setSelectedPark(null);
                    }}
                >
                    <div>
                        <h2>{selectedPark.properties.NAME}</h2>
                        <p>{selectedPark.properties.DESCRIPTIO}</p>
                    </div>
                </InfoWindow>
            )}
        </GoogleMap>
    );
}

const Map = withScriptjs(withGoogleMap(ChicagoMap));
export default Map;

// const WrapperMap = withScriptjs(withGoogleMap(ChicagoMap));
/*export default function Map() {
    return <div style={{width: "100vw", height: "100vh"}}>
        <WrapperMap googleMapURL={'https://maps.googleapis.com/maps/api/js?v=3.exp&libraries=geometry,drawing,places&key=AIzaSyCT2VEknjHJ87bpDx5QuwFwgFM7JWnqDe8&language=en-US'}
                    loadingElement={<div style={{ height:"100%" }} />}
                    containerElement={<div style={{ height:"100%" }} />}
                    mapElement={<div style={{ height:"100%" }} />}
        />
    </div>
}*/
