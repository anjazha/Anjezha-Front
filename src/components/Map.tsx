/* eslint-disable @typescript-eslint/no-explicit-any */
import { useState } from 'react';
import { MapContainer, TileLayer, Marker, useMapEvents } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import L, { LatLng } from 'leaflet';
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

const Map = ({setErrorMap}:{setErrorMap: React.Dispatch<React.SetStateAction<boolean>>}) => {
    const [position, setPosition] = useState<LatLng | null>(null);
    const location = {
        lat: +localStorage.latitude,
        lng: +localStorage.longitude
    }

    const LocationMarker = () => {
        useMapEvents({
            click(e) {
                setPosition(e.latlng);  // تحديد الإحداثيات عند النقر
                localStorage.setItem("latitude", e.latlng.lat.toString())
                localStorage.setItem("longitude", e.latlng.lng.toString())
                setErrorMap(false)
            },
        });

        return position === null ? null : (
            <Marker position={position}></Marker>
        );
    };

    // console.log(position?.lat)
    // console.log(position?.lng)

    return (
        <MapContainer center={[+localStorage.latitude || 30.088107753367257,+localStorage.longitude || 31.253356933593754]} zoom={7} style={{ height: '300px', width: '100%' }}>
            <TileLayer
                url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
            />
            <LocationMarker />
            {
                localStorage.latitude && localStorage.longitude && <Marker position={location}></Marker>
            }
        </MapContainer>
    );
};

export default Map;