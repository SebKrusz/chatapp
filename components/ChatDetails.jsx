"use client";
import { AddPhotoAlternate } from "@mui/icons-material";
import Loader from "./Loader";
import { useSession } from "next-auth/react";
import { useState, useEffect, useRef } from "react";
import Link from "next/link";
import { CldUploadButton } from "next-cloudinary";
import MessageBox from "./MessageBox";
import { pusherClient } from "@lib/pusher";

const ChatDetails = ({ chatId }) => {
	const [loading, setLoading] = useState(true);
	const [chat, setChat] = useState({});
	const [otherMembers, setOtherMembers] = useState([]);
	const [text, setText] = useState("");
	const { data: session } = useSession();
	const currentUser = session?.user;

	const getChatDetails = async () => {
		try {
			const res = await fetch(`/api/chats/${chatId}`, {
				method: "GET",
				headers: {
					"Content-Type": "application/json",
				},
			});
			const data = await res.json();
			setChat(data);
			setOtherMembers(
				data?.members?.filter(
					(member) => member._id !== currentUser._id
				)
			);
			setLoading(false);
		} catch (error) {
			console.log(error);
		}
	};

	useEffect(() => {
		if (currentUser && chatId) getChatDetails();
	}, [currentUser, chatId]);

	const sendText = async () => {
		try {
			const res = await fetch("/api/messages", {
				method: "POST",
				headers: {
					"Content-Type": "application/json",
				},
				body: JSON.stringify({
					chatId,
					currentUserId: currentUser._id,
					text,
				}),
			});
			if (res.ok) {
				setText("");
			}
		} catch (error) {
			console.log(error);
		}
	};

	const sendPhoto = async (result) => {
		try {
			const res = await fetch("/api/messages", {
				method: "POST",
				headers: {
					"Content-Type": "application/json",
				},
				body: JSON.stringify({
					chatId,
					currentUserId: currentUser._id,
					photo: result?.info?.secure_url,
				}),
			});
		} catch (error) {
			console.log(error);
		}
	};

	useEffect(() => {
		pusherClient.subscribe(chatId);

		const handleMessage = async (newMessage) => {
			setChat((prevChat) => {
				return {
					...prevChat,
					messages: [...prevChat.messages, newMessage],
				};
			});
		};

		pusherClient.bind("new-message", handleMessage);

		return () => {
			pusherClient.unsubscribe(chatId);
			pusherClient.unbind("new-message", handleMessage);
		};
	}, [chatId]);

	/* Scrolling down to the bottom when having the new message */

	const bottomRef = useRef(null);

	useEffect(() => {
		bottomRef.current?.scrollIntoView({
			behavior: "smooth",
		});
	}, [chat?.messages]);

	return loading ? (
		<Loader />
	) : (
		<div className="pb-20 xl:pb-0">
			<div className="chat-details">
				<div className="chat-header">
					{chat?.isGroup ? (
						<>
							<Link href={`/chats/${chatId}/group-info`}>
								<img
									src={
										chat?.groupPhoto || "/assets/group.png"
									}
									alt="group-photo"
									className="profilePhoto"
								/>
							</Link>
							<div className="text">
								<p>
									{chat?.name} &#160; &#183; &#160;{" "}
									{chat?.members?.length}
									members
								</p>
							</div>
						</>
					) : (
						<>
							<img
								src={
									otherMembers[0].profileImage ||
									"/assets/person.jpg"
								}
								alt="profile photo"
								className="profilePhoto"
							/>
							<div className="text">
								<p>{otherMembers[0].username}</p>
							</div>
						</>
					)}
				</div>
				<div className="chat-body">
					{chat?.messages?.map((message, index) => (
						<MessageBox
							key={index}
							message={message}
							currentUser={currentUser}
						/>
					))}
					<div ref={bottomRef} />
				</div>
				<div className="send-message">
					<div className="prepare-message">
						<CldUploadButton
							options={{ maxFiles: 1 }}
							onSuccess={sendPhoto}
							uploadPreset="l66pngm1">
							<AddPhotoAlternate
								sx={{
									fontSize: "35px",
									color: "#737373",
									cursor: "pointer",
									"&:hover": { color: "red" },
								}}
							/>
						</CldUploadButton>
						<input
							type="text"
							placeholder="Write a message..."
							value={text}
							onChange={(e) => setText(e.target.value)}
							required
							className="input-field"
						/>
					</div>
					<div onClick={sendText}>
						<img
							src="/assets/send.jpg"
							alt="send"
							className="send-icon"
						/>
					</div>
				</div>
			</div>
		</div>
	);
};

export default ChatDetails;
