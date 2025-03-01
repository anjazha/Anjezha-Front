/* eslint-disable @typescript-eslint/no-explicit-any */
import { useState } from 'react';
import { MapContainer, TileLayer, Marker, useMapEvents } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import L from 'leaflet';
import iconRetinaUrl from 'leaflet/dist/images/marker-icon-2x.png';
import iconUrl from 'leaflet/dist/images/marker-icon.png';
import shadowUrl from 'leaflet/dist/images/marker-shadow.png';
import { SetURLSearchParams } from 'react-router-dom';

// لإصلاح مشكلة الأيقونات الافتراضية
delete (L.Icon.Default.prototype as any)._getIconUrl;
L.Icon.Default.mergeOptions({
    iconRetinaUrl,
    iconUrl,
    shadowUrl,
});

interface mapData {
    latitude:any,
    longitude:any,
    location:boolean,
    setErrorMap?: React.Dispatch<React.SetStateAction<boolean>>,
    tasker?:boolean;
    search?: URLSearchParams;
    setSearch?: SetURLSearchParams;
}

const Map = ({latitude,longitude,location,setErrorMap,tasker,search,setSearch}:mapData) => {
    const [position, setPosition] = useState<{lat:number,lng:number}>(
        {
            lat: +latitude,
            lng: +longitude
        }
    );
    // const location = {
    //     lat: +latitude,
    //     lng: +longitude
    // }
    // console.log(position);

    const LocationMarker = () => {
        useMapEvents({
            click(e) {
                setPosition({lat:+e.latlng.lat.toString(),lng:+e.latlng.lng.toString()});  // تحديد الإحداثيات عند النقر
                if(tasker){
                    const currentSearch = new URLSearchParams(search)
                    currentSearch.set("latitude", e.latlng.lat.toString())
                    currentSearch.set("longitude", e.latlng.lng.toString())
                    setSearch?.(currentSearch)
                }
                else{
                    localStorage.setItem("latitude", e.latlng.lat.toString())
                    localStorage.setItem("longitude", e.latlng.lng.toString())
                    setErrorMap?.(false)
                }
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
                <MapContainer
                    center={[ position.lat || 30.088107753367257,position.lng || 31.253356933593754]}
                    zoom={7} 
                    style={{ height: '300px', width: '100%',zIndex:10 }}
                    dragging={location} // منع السحب
                    touchZoom={location} // منع التكبير باللمس
                    scrollWheelZoom={location} // منع التكبير باستخدام عجلة الماوس
                    doubleClickZoom={location} // منع التكبير بالنقر المزدوج
                    zoomControl={true} // إخفاء أدوات التحكم بالتكبير
                >
                    <TileLayer
                        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                    />
                    { location && <LocationMarker />}
                    {
                        position.lat && position.lng && <Marker position={position}></Marker>
                    }
                </MapContainer>
        
    );
};

export default Map;