"use client";
import dynamic from "next/dynamic";
import Image from "next/image";

const Map = dynamic(async() => import("@/components/Map"), {
	loading: () => <p>loading...</p>,
	ssr: false,
});
const Home = () => {
	return (
		<>
			{/* hello */}
			<Map />
		</>
	);
};
export default Home;
