"use client";

import { useEffect, useRef, useState } from "react";
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import pms from "pretty-ms";
import type { Map as LMap } from "leaflet";
import { css } from "@emotion/react";
import "leaflet/dist/leaflet.css";
import React, { Component } from "react";
import L from "leaflet";
import { LocateControl } from "./LocateControl";
import Add from "@mui/icons-material/Add";
import { Modal, Box, Button, TextField, Snackbar, IconButton, Alert, Typography } from "@mui/material";
import LocationInaccuracyPopupAndroid from "./LocationInaccuracyPopupAndroid";

import { Close } from "@mui/icons-material";
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

let inaccuracyPopupDisplayed = false;
let oldPosition = [0, 0];
const Map = () => {
	function handleWaypointClick() {
	}

	const [pos, setPos] = useState([0, 0] as [number, number]);
	const mapRef = useRef<LMap>(null);
	const [menuShown, setMenuShown] = useState(false);
	const [inText, setInText] = useState("");
	const [showInaccuracyPopup, setShowInaccuracyPopup] = useState(false);
	const [showSuccessPopup, setShowSuccessPopup] = useState(false);
	const [openedWaypoint, setOpenedWaypoint] = useState(-1);
	const [waypoints, setWaypoints] = useState(
		localStorage.waypoints
			? JSON.parse(localStorage.waypoints)
			: ([
					{
						coords: [43.47289490714024, -80.53953821701889],
						text: "Cool place",
						user: "northernHacker43",
						time: Date.now() - 100000,
					},
			  ] as {
					coords: [number, number];
					text: string;
					user: string;
					time: number;
			  }[])
	);
	const [showWaypointModal, setShowWaypointModal] = useState(false);

	useEffect(() => {
		navigator.geolocation.watchPosition(
			x => {
				if (!x.coords.latitude || !x.coords.longitude) return;
				setPos([x.coords.latitude, x.coords.longitude]);

				let movedDistance = Math.sqrt(Math.pow(pos[0] - oldPosition[0], 2) + Math.pow(pos[1] - oldPosition[1], 2));
				if (movedDistance > 9.00900901e-6) {
					mapRef.current?.setView([x.coords.latitude, x.coords.longitude]);
				} else {
				}
				if (x.coords.accuracy > 90 && !inaccuracyPopupDisplayed) {
					inaccuracyPopupDisplayed = true;
					setShowInaccuracyPopup(true);
				}
				oldPosition = pos.slice();
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
				onClose={() => setMenuShown(false)}
			>
				<Box
					sx={{
						padding: "24px",
						margin: "2rem",
						display: "flex",
						justifyContent: "center",
						alignItems: "center",
						backgroundColor: "white",
						dropShadow: "1px 1px 3px #444",
						width: "500px	",
						flexDirection: "column",
						gap: "12px",
						borderRadius: "1rem",
					}}
				>
					<h1>
						<b>Create a Waypoint</b>
					</h1>
					<h2>Enter the waypoint text.</h2>
					<TextField label="Text" variant="outlined" value={inText} onChange={e => setInText(e.target.value)} />
					<Button
						variant="outlined"
						onClick={() => {
							setWaypoints(x =>
								inText === "clear"
									? [
											{
												coords: [43.47289490714024, -80.53953821701889],
												text: "Cool place",
												user: "northernHacker43",
												time: Date.now() - 100000,
											},
									  ]
									: x.concat({ coords: pos, text: inText, user: "testUser", time: Date.now() })
							);
							setInText("");
							setShowSuccessPopup(true);
							setMenuShown(false);
							localStorage.waypoints = JSON.stringify(waypoints);
						}}
					>
						Submit
					</Button>
				</Box>
			</Modal>

			<Modal
				open={openedWaypoint !== -1}
				sx={{
					display: "flex",
					justifyContent: "center",
					alignItems: "center",
				}}
				onClose={() => setOpenedWaypoint(-1)}
			>
				<Box
					sx={{
						padding: "24px",
						margin: "2rem",
						display: "flex",
						justifyContent: "center",
						alignItems: "center",
						backgroundColor: "white",
						dropShadow: "1px 1px 3px #444",
						width: "500px	",
						flexDirection: "column",
						gap: "12px",
						borderRadius: "1rem",
					}}
				>
					<h1>
						<b>Waypoint</b>
					</h1>
					<h2>{waypoints[openedWaypoint]?.text}</h2>

					<Typography variant="overline" display="block">
						<b>Placed by {waypoints[openedWaypoint]?.user}</b> -{" "}
						{pms(Date.now() - (waypoints[openedWaypoint]?.time ?? 0), { verbose: true, unitCount: 1 })} ago
					</Typography>
				</Box>
			</Modal>

			<section css={mapSection}>
				<MapContainer center={pos} zoom={13} scrollWheelZoom={true} css={mapSection} ref={mapRef}>
					<TileLayer
						attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors | William, John, Daniel @ Hack the North 2023'
						url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
						maxNativeZoom={19}
						maxZoom={21}
					/>
					{waypoints.map((x, i) => (
						<div key={i} onClick={handleWaypointClick}>
							<Marker
								position={x.coords}
								icon={customIcon}
								eventHandlers={{
									click: e => {
										setOpenedWaypoint(i);
									},
								}}
							></Marker>
						</div>
					))}
					<LocateControl position="topright" />
				</MapContainer>
				<button
					title="Add Waypoint"
					css={css`
						position: fixed;
						right: 20px;
						bottom: 20px;
						z-index: 444;
						background-color: #bc3a3a;
						border-radius: 50%;
						padding: 8px;
						box-shadow: 1px 1px 3px #000a;
						color: white;
						transition: background-color 0.2s;
						&:hover {
							filter: brightness(90%);
						}
						&:active {
							filter: brightness(80%);
						}
					`}
				>
					<Add scale={5} fontSize="large" onClick={() => setMenuShown(true)} />
				</button>
			</section>

			{showInaccuracyPopup && <LocationInaccuracyPopupAndroid />}
			{
				<Snackbar
					open={showSuccessPopup}
					autoHideDuration={6000}
					onClose={() => setShowSuccessPopup(false)}
					action={
						<>
							<IconButton
								size="small"
								aria-label="close"
								color="inherit"
								onClick={() => setShowSuccessPopup(false)}
							>
								<Close fontSize="small" />
							</IconButton>
						</>
					}
				>
					<Alert onClose={() => setShowSuccessPopup(false)} severity="success" sx={{ width: "100%" }}>
						Your waypoint was successfully created.
					</Alert>
				</Snackbar>
			}
		</>
	);
};
export default Map;
