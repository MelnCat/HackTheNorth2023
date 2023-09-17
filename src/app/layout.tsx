"use client"
import "./globals.scss";
import type { Metadata } from "next";
import { Inter } from "next/font/google";

const inter = Inter({ subsets: ["latin"] });

const RootLayout = ({ children }: { children: React.ReactNode }) => {
	return (
		<html lang="en">
			<head>
				<title>MarkingWithTech</title>
				<link rel="icon" href="/favicon.ico" />
			</head>
			<body className={inter.className}>
				<main>{children}</main>
				<nav>
					
				</nav>
			</body>
		</html>
	);
};

export default RootLayout;
