"use client";
import Image from "next/image";
import { useEffect, useState } from "react";
import { Interactive, XR, ARButton, Controllers } from "@react-three/xr";
import { Text } from "@react-three/drei";
import { Canvas } from "@react-three/fiber";
import WaypointText from "../../components/WaypointText"
function Box({ color, size, scale, children, ...rest }: any) {
	return (
		<mesh scale={scale} {...rest}>
			<meshPhongMaterial color={color} />
			{children}
		</mesh>
	);
}
const World = () => {
	const [data, setData] = useState([0, 0]);
	useEffect(() => {
		navigator.geolocation.getCurrentPosition(x => setData([x.coords.latitude, x.coords.longitude]), null, {
			enableHighAccuracy: true,
		});
	}, []);
	if (data[0] === 0 && data[1] === 0) return <p>loading</p>;
	return (
		<>
			<ARButton />
			<Canvas>
				<XR referenceSpace="local">
					<ambientLight />
					<pointLight position={[0, 0, 1]} />
					<mesh scale={1}>
						<Interactive>
							<WaypointText position={[0,0,0]}>hello there</WaypointText>
							<WaypointText position={[1,0,0]}>byte</WaypointText>
						</Interactive>
					</mesh>
					<Controllers />
				</XR>
			</Canvas>
		</>
	);
};
export default World;
