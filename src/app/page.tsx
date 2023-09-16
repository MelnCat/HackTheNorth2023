"use client";
import dynamic from "next/dynamic";
import Image from "next/image";
import LoadingScreen from "../components/Loading";

const Map = dynamic(async() => import("@/components/Map"), {
	loading: () => <LoadingScreen />,
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
