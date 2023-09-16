"use client";
import Image from "next/image";
import { useEffect, useState } from "react";

const World = () => {
	const [data, setData] = useState([0, 0]);
	const update = () => {
		navigator.geolocation.getCurrentPosition(x => setData([x.coords.latitude, x.coords.longitude]), null, { enableHighAccuracy: true })
	}
	return <p onClick={update}>{data.join(" | ")}</p>;
};
export default World;
