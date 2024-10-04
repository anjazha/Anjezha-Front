/* eslint-disable @typescript-eslint/no-explicit-any */
import { useState } from 'react';
import { MapContainer, TileLayer, Marker, useMapEvents } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import L from 'leaflet';
import iconRetinaUrl from 'leaflet/dist/images/marker-icon-2x.png';
import iconUrl from 'leaflet/dist/images/marker-icon.png';
import shadowUrl from 'leaflet/dist/images/marker-shadow.png';

// لإصلاح مشكلة الأيقونات الافتراضية
delete (L.Icon.Default.prototype as any)._getIconUrl;
L.Icon.Default.mergeOptions({
    iconRetinaUrl,
    iconUrl,
    shadowUrl,
});

const Map = ({latitude,longitude,setErrorMap}:{latitude:any,longitude:any,setErrorMap?: React.Dispatch<React.SetStateAction<boolean>>}) => {
    const [position, setPosition] = useState({
        lat: +latitude,
        lng: +longitude
    });
    // const location = {
    //     lat: +latitude,
    //     lng: +longitude
    // }
    // console.log(position);

    const LocationMarker = () => {
        useMapEvents({
            click(e) {
                setPosition({lat:+e.latlng.lat.toString(),lng:+e.latlng.lng.toString()});  // تحديد الإحداثيات عند النقر
                // localStorage.setItem("latitude", e.latlng.lat.toString())
                // localStorage.setItem("longitude", e.latlng.lng.toString())
                setErrorMap?.(false)
            },
        });

        return null;
        // return position === null ? null : (
        //     <Marker position={position}></Marker>
        // );
    };

    // console.log(position?.lat)
    // console.log(position?.lng)

    return (
        <MapContainer center={[position.lat || 30.088107753367257,position.lng || 31.253356933593754]} zoom={7} style={{ height: '300px', width: '100%' }}>
            <TileLayer
                url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
            />
            <LocationMarker />
            {
                position.lat && position.lng && <Marker position={position}></Marker>
            }
        </MapContainer>
    );
};

export default Map;