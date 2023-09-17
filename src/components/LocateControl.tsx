'use client';
import { createControlComponent } from "@react-leaflet/core";
import * as L from "leaflet";
import "leaflet.locatecontrol";
import "leaflet.locatecontrol/dist/L.Control.Locate.css";

export const LocateControl = createControlComponent(p => {
	const c = new L.Control.Locate(p);
	const old = c.addTo.bind(c);
	c.addTo = function(...args) {
		old(...args);
		this.start();
		return this;
	}
	return c;
});
