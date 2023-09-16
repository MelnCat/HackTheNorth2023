"use client";
import Image from "next/image";
import { useEffect, useState } from "react";

const World = () => {
	const [data, setData] = useState([0, 0]);
	useEffect(() => {
		navigator.geolocation.watchPosition(x => setData(x.coords));
	}, []);
	return <>{JSON.stringify(data, null, "\t")}{data.longitude}{JSON.stringify(Object.getOwnPropertyNames(Object.getPrototypeOf(x)))}</>;
};
export default World;
