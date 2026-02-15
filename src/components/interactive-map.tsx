"use client";

import { useEffect } from "react";
import { MapContainer, TileLayer, Marker, Popup, useMap } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import L from "leaflet";

// Fix for default Leaflet marker icons in Next.js
const iconUrl = "https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon.png";
const iconRetinaUrl = "https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon-2x.png";
const shadowUrl = "https://unpkg.com/leaflet@1.9.4/dist/images/marker-shadow.png";

const customIcon = new L.Icon({
    iconUrl,
    iconRetinaUrl,
    shadowUrl,
    iconSize: [25, 41],
    iconAnchor: [12, 41],
    popupAnchor: [1, -34],
    shadowSize: [41, 41]
});

// Component to handle map resizing
function MapResizer() {
    const map = useMap();
    useEffect(() => {
        const resizeObserver = new ResizeObserver(() => {
            map.invalidateSize();
        });
        const container = map.getContainer();
        resizeObserver.observe(container);
        return () => resizeObserver.disconnect();
    }, [map]);
    return null;
}

interface InteractiveMapProps {
    center: [number, number];
    zoom?: number;
    markers?: Array<{ pos: [number, number]; label: string }>;
}

export default function InteractiveMap({ center, zoom = 13, markers = [] }: InteractiveMapProps) {
    return (
        <MapContainer
            center={center}
            zoom={zoom}
            style={{ height: "100%", width: "100%", zIndex: 0 }}
            scrollWheelZoom={true} // Enable zoom
        >
            <TileLayer
                attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                // Using a dark theme provider for tactical look
                className="map-tiles"
            />
            {/* Dark mode overlay effect handled by parent CSS filter if needed */}

            <MapResizer />

            <Marker position={center} icon={customIcon}>
                <Popup>
                    Command Center <br /> (Current HQ)
                </Popup>
            </Marker>

            {markers.map((m, i: number) => (
                <Marker key={i} position={m.pos} icon={customIcon}>
                    <Popup>{m.label}</Popup>
                </Marker>
            ))}
        </MapContainer>
    );
}
