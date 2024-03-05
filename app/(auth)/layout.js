import { Inter } from "next/font/google";
import "../globals.css";
import ToasterContext from "@components/ToasterContext";

const inter = Inter({ subsets: ["latin"] });

export const metadata = {
	title: "Tarkov Themed Chat App",
	description:
		"Tarkov Themed Chat App made to learn  Next Auth, MongoDB, Pusher & expand my skills with Next.js and Tailwind.",
};

export default function RootLayout({ children }) {
	return (
		<html lang="en">
			<body className={`${inter.className} bg-purple-1`}>
				<ToasterContext />
				{children}
			</body>
		</html>
	);
}
