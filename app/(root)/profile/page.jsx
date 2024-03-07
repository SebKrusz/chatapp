"use client";

import { PersonOutline } from "@mui/icons-material";
import { useSession } from "next-auth/react";
import React from "react";
import { useForm } from "react-hook-form";

const Profile = () => {
	const { data: session } = useSession();
	const user = session?.user;
	const {
		register,
		watch,
		setValue,
		handleSubmit,
		formState: { errors },
	} = useForm();
	return (
		<div className="profile-page">
			<h1 className="text-heading3-bold">Edit Your Profile</h1>
			<form className="edit-profile">
				<div className="input">
					<input
						{...register("username", {
							required: "Username is required",
							validate: (value) => {
								if (value.length < 3) {
									return "Username must be at least 3 characters long";
								}
							},
						})}
						type="text"
						placeholder="username"
						className="input-field"
					/>
					<PersonOutline sx={{ color: "#737373" }} />
				</div>
				<div className="flex items-center justify-between">
					<img
						src={user?.profileImage || "/assets/person.jpg"}
						alt="profile"
						className="w-40 h-40 rounded-full"
					/>
					<p className="text-body-bold">Upload new photo</p>
				</div>
				<button className="btn" type="submit">
					Save Changes
				</button>
			</form>
		</div>
	);
};

export default Profile;
