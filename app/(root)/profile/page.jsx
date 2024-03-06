import { PersonOutline } from "@mui/icons-material";
import { useSession } from "next-auth/react";
import React from "react";

const Profile = () => {
	const { data: session } = useSession();
	const user = session?.user;
	return (
		<div className="profile-page">
			<h1 className="text-heading3-bold">Edit Your Profile</h1>
			<form className="edit-profile">
				<div className="input">
					<input
						type="text"
						placeholder="username"
						className="input-field"
					/>
					<PersonOutline sx={{ color: "#737373" }} />
				</div>
				<div className="flex items-end justify-between">
					<img
						src={user?.profileImage || "/assets/person.jpg"}
						alt="profile"
						className="w-40 h-40 rounded-full"
					/>
					<p>Upload new photo</p>
				</div>
			</form>
		</div>
	);
};

export default Profile;
