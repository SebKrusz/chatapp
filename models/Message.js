import mongoose from "mongoose";

const MessageSchema = new mongooose.MessageSchema({
	chat: {
		type: mongoose.Schema.Types.ObjectId,
		ref: "Chat",
	},
	sender: {
		type: mongoose.Schema.Types.ObjectId,
		ref: "User",
	},
	text: {
		type: String,
		default: "",
	},
	photo: {
		type: String,
		default: "",
	},
	createdAt: {
		type: Date,
		default: Date.now,
	},
	seenBy: [
		{
			type: mongoose.Schema.Types.ObjectId,
			ref: "User",
		},
	],
	default: [],
});

const message =
	mongoose.model.Message || mongoose.model("Message", MessageSchema);

export default message;
