'use client';

import roboto from "./Roboto.json"
import { extend } from "@react-three/fiber"
import { FontLoader } from "three/addons/loaders/FontLoader";
import { TextGeometry } from "three/addons/geometries/TextGeometry";

extend({ TextGeometry })

const WaypointText = ({ children, position }: { children: string, position: [number, number, number] }) => {
	const font = new FontLoader().parse(roboto);
	return <mesh position={position} rotation={[0, Math.PI / 2, 0]}>
		<textGeometry args={[children, {font, size: 0.1, height: 0.01}]} /> 
		<meshPhysicalMaterial attach="material" color="white" />
	</mesh> 
}

export default WaypointText;