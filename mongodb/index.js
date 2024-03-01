import mongoose from "mongoose";

let isConnected = false;

export const connectDb = async () => {
	mongoose.set("strictQuery", true);
	if (isConnected) {
		console.log("MongoDB is already connected");
	}
	try {
		await mongoose.connect(process.env.MONGODB_URL, {
			dbName: "Tarkov Chat",
			useNewUrlParser: true,
			uneUnifiedTopology: true,
		});
		isConnected = true;
		console.log("MongoDB Connected successfully");
	} catch (error) {
		console.log("Error connecting to MongoDB", error);
	}
};
