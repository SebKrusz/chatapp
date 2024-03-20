import { connectToDB } from "@mongodb";

export const POST = async (req) => {
	try {
		connectToDB();
		const body = req.json();
		const { chatId, currentUserId, text, photo } = body;
		const newMessage = await Message.create({
			chat: chatId,
			sender: currentUserId,
			text,
			photo,
			seenBy: currentUserId,
		});
	} catch (err) {
		console.log(err);
	}
};
