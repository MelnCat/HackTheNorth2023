
"use client";

import React from "react";
import "./loading.css";

export default function LoadingScreen() {
    
    return <div style={{
		width: "100vw",
		height: "100vh",
		display: "flex",
		alignItems: "center",
		justifyContent: "center"
	}}>
    <div className="spinner"></div>
    </div>;
}