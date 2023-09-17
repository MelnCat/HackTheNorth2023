"use client";
import Image from "next/image";
import { useEffect, useState } from "react";
import { Interactive, XR, ARButton, Controllers } from "@react-three/xr";
import { Text } from "@react-three/drei";
import { Canvas } from "@react-three/fiber";
import LoadingScreen from "../../components/Loading";
import WaypointText from "../../components/WaypointText";
function Box({ color, size, scale, children, ...rest }: any) {
	return (
		<mesh scale={scale} {...rest}>
			<meshPhongMaterial color={color} />
			{children}
		</mesh>
	);
}
const World = () => {
	const [waypoints, setWaypoints] = useState(null);
	const [data, setData] = useState([0, 0]);
	const [orientation, setOrientation] = useState(null);
	useEffect(() => {
		navigator.geolocation.getCurrentPosition(x => setData([x.coords.latitude, x.coords.longitude]), null, {
			enableHighAccuracy: true,
		});
		setWaypoints(globalThis.localStorage.waypoints ? JSON.parse(globalThis.localStorage.waypoints) : []);
	}, []);
	if ((data[0] === 0 && data[1] === 0) || !waypoints) return <LoadingScreen />;
	return (
		<>
			<ARButton />
			<Canvas>
				<XR referenceSpace="local">
					<ambientLight />
					<pointLight position={[0, 0, 1]} />
					<mesh scale={1}>
						<Interactive>
							{waypoints.map((x, i) => (
								<WaypointText key={i} position={[(x.coords[0] - data[0]) * 1111, 0, (x.coords[1] - data[1]) * 1111]}>
									{x.text}
								</WaypointText>
							))}
						</Interactive>
					</mesh>
					<Controllers />
				</XR>
			</Canvas>
		</>
	);
};
export default World;
