'use client';
import React, { useState } from "react";
import { Snackbar, Button, Alert, IconButton } from "@mui/material";
import {Close} from "@mui/icons-material";

export default function LocationInaccuracyPopupAndroid() {
	const [open, setOpen] = useState(true);

	const action = (
		<>
		  <IconButton
			size="small"
			aria-label="close"
			color="inherit"
			onClick={() => setOpen(false)}
		  >
			<Close fontSize="small" />
		  </IconButton>
		</>
	  );

	return (
		<Snackbar open={open} onClose={() => setOpen(false)}>
        <Alert onClose={() => setOpen(false)} severity="warning" sx={{ width: '100%' }}>
          Your location has low accuracy. Click <a style={{color: "blue"}} href="https://www.thetechedvocate.org/ways-to-improve-the-gps-location-accuracy-on-android-devices/">here</a> for potential solutions.
        </Alert>
      </Snackbar>
	);
}
