import { Inter } from "next/font/google";
import "../globals.css";
import Provider from "@components/Provider";
import NavBar from "@components/NavBar";
import BottomBar from "@components/BottomBar";

const inter = Inter({ subsets: ["latin"] });

export const metadata = {
	title: "Chat App Tarkov Themed",
	description: "Created by Sebastian Kruszewski",
};

export default function RootLayout({ children }) {
	return (
		<html lang="en">
			<body className={` ${inter.className} bg-blue-2`}>
				<Provider>
					<NavBar />
					{children}
					<BottomBar />
				</Provider>
			</body>
		</html>
	);
}
