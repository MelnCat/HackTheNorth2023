"use client";

import { useEffect, useRef, useState } from "react";
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import type { Map as LMap } from "leaflet";
import { css } from "@emotion/react";
import "leaflet/dist/leaflet.css";

const mapSection = css`
	width: 100%;
	height: 100%;
`;
const Map = () => {
	const [pos, setPos] = useState([0, 0] as [number, number]);
	const mapRef = useRef<LMap>(null);
	useEffect(() => {
		navigator.geolocation.watchPosition(x => {
			setPos([x.coords.latitude, x.coords.longitude]);
			mapRef.current?.setView([x.coords.latitude, x.coords.longitude]);
			console.log(x.coords.accuracy);
		});
	}, []);
	return (
		<section css={mapSection}>
			<MapContainer center={pos} zoom={13} scrollWheelZoom={false} css={mapSection} ref={mapRef}>
				<TileLayer
					attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
					url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
				/>
				<Marker position={pos} >
					<Popup>
						A pretty CSS3 popup. <br /> Easily customizable.
					</Popup>
				</Marker>
			</MapContainer>
		</section>
	);
};
export default Map;
