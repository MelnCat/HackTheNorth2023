"use client";

import { useEffect, useRef, useState } from "react";
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import type { Map as LMap } from "leaflet";
import { css } from "@emotion/react";
import "leaflet/dist/leaflet.css";
import React, { Component } from "react";
import L from "leaflet";
import { LocateControl } from "./LocateControl";
import Add from "@mui/icons-material/Add";
import { Modal, Box, Button, TextField } from "@mui/material";

const mapSection = css`
	width: 100%;
	position: relative;
	height: 100%;
`;

const currentIcon = L.icon({
	iconUrl: "/img/Marker1.png",
	iconSize: [69, 57],
	popupAnchor: [-10, -30],
});

const customIcon = L.icon({
	iconUrl: "/img/Marker2.png",
	iconSize: [44, 44],
	popupAnchor: [-10, -30],
});

const Map = () => {
	const [pos, setPos] = useState([0, 0] as [number, number]);
	const mapRef = useRef<LMap>(null);
	const [menuShown, setMenuShown] = useState(false);
	useEffect(() => {
		navigator.geolocation.watchPosition(
			x => {
				setPos([x.coords.latitude, x.coords.longitude]);
				mapRef.current?.setView([x.coords.latitude, x.coords.longitude]);
				console.log(x.coords.accuracy);
			},
			null,
			{ enableHighAccuracy: true }
		);
	}, []);
	return (
		<>
			<Modal
				open={menuShown}
				sx={{
					display: "flex",
					justifyContent: "center",
					alignItems: "center",
				}}
			>
				<Box
					sx={{
						padding: "24px",
						margin: "auto",
						display: "flex",
						justifyContent: "center",
						alignItems: "center",
						backgroundColor: "white",
						dropShadow: "1px 1px 3px #444",
						width: "500px	",
						flexDirection: "column",
						gap: "12px",
						borderRadius: "1rem"
					}}
				>
					<h1><b>Create a Waypoint</b></h1>
					<h2>Name Your Waypoint</h2>
					<TextField label="Text" variant="outlined" /> */
					<Button variant="outlined">Submit</Button>
				</Box>
			</Modal>
            {/* <Marker position={[0, 0]} icon={customIcon}>
				<Popup>a</Popup>
			</Marker> */}
			<section css={mapSection}>
				<MapContainer center={pos} zoom={13} scrollWheelZoom={false} css={mapSection} ref={mapRef}>
					<TileLayer
						attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
						url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
						maxNativeZoom={19}
						maxZoom={21}
					/>
					{/* <Marker position={[43.47289490714024, -80.53953821701889]} icon={customIcon}>
						<Popup>Waypoint</Popup>
					</Marker> */}
					<LocateControl position="topright" keepCurrentZoomLevel />
				</MapContainer>
				<button
					css={css`
						position: absolute;
						right: 20px;
						bottom: 20px;
						z-index: 10000;
						background-color: white;
						border-radius: 50%;
						padding: 8px;
						box-shadow: 1px 1px 3px #000a;
						transition: background-color 0.2s;
						&:hover {
							background-color: #e7e7e7;
						}
						&:active {
							background-color: #d2d2d2;
						}
					`}
				>
					<Add scale={5} fontSize="large" onClick={() => setMenuShown(true)} />
				</button>
			</section>
		</>
	);
};
export default Map;
