"use client";
import dynamic from "next/dynamic";
import Image from "next/image";
import LoadingScreen from "../components/Loading";
import { createTheme } from '@mui/material/styles';

const theme = createTheme({
  palette: {
    primary: {
      main: "#bc3a3a",
    },
    secondary: {
		main: "#bc3a3a",
    },
  },
});
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
