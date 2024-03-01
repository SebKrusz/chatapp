import {
	PersonOutline,
	EmailOutlined,
	LockOutlined,
} from "@mui/icons-material";
import React from "react";
import Link from "next/link";

const Form = ({ type }) => {
	return (
		<div className="auth">
			<div className="content">
				<img src="/assets/logo.png" alt="logo" className="logo" />
				<form className="form">
					{type === "register" && (
						<div className="input">
							<input
								type="text"
								placeholder="Username"
								className="input-field"
							/>
							<PersonOutline sx={{ color: "#737373" }} />
						</div>
					)}
					<div className="input">
						<input
							type="email"
							placeholder="Email"
							className="input-field"
						/>
						<EmailOutlined sx={{ color: "#737373" }} />
					</div>
					<div className="input">
						<input
							type="password"
							placeholder="Password"
							className="input-field"
						/>
						<LockOutlined sx={{ color: "#737373" }} />
					</div>
					<button className="button" type="submit">
						{type === "register" ? "Register" : "Login"}
					</button>
				</form>
				{type === "register" ? (
					<Link href="/" className="link">
						<p className="text-center">
							Already have an account? Sign in Here
						</p>
					</Link>
				) : (
					<Link href="/register" className="link">
						<p className="text-center">
							Don't have an account? Sign up Here
						</p>
					</Link>
				)}
			</div>
		</div>
	);
};

export default Form;
