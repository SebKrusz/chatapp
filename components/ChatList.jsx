import React, { use, useState } from "react";
import { useSession } from "next-auth/react";

const ChatList = () => {
	const { data: sessions } = useSession();
	const currentUser = sessions?.user;
	const [loading, setLoading] = useState(true);
	const [chats, setChats] = useState([]);

	const getChats = async () => {
		try {
			const res = await fetch(`/api/users/${currentUser._id}`);
			const data = await res.json();
			setChats(data);
			setLoading(false);
		} catch (err) {
			console.log(err);
			return;
		}
	};

	useEffect(() => {
		if (currentUser) {
			getChats();
		}
	}, [currentUser]);
	return loading ? (
		<Loader />
	) : (
		<div className="chat-list">
			<input placeholder="Search chat..." className="input-search" />
		</div>
	);
};

export default ChatList;
