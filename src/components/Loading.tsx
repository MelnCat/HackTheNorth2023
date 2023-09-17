
"use client";

import React from "react";
import "./loading.css";
import {useState, useEffect} from "react";

export default function LoadingScreen() {
    
	const [showConnectivityTip, setShowConnectivityTip] = useState(false);

	useEffect(() => {
		const timer = setTimeout(() => {
			setShowConnectivityTip(true);
		}, 3000);
		return () => clearTimeout(timer);
	  }, []);


    return <> <div style={{
		width: "100vw",
		height: showConnectivityTip ? "70vh" : "100vh",
		display: "flex",
		alignItems: "center",
		justifyContent: "center"
	}}>
    <div className="spinner"></div>
    </div>
	{showConnectivityTip && <p style={{textAlign: "center"}}>Loading the map is taking a while. Please be patient or check your internet connection.</p>}
	</>;
	
}