"use client";
import {
	PersonOutline,
	EmailOutlined,
	LockOutlined,
} from "@mui/icons-material";
import React from "react";
import Link from "next/link";
import { useForm } from "react-hook-form";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";

const Form = ({ type }) => {
	const {
		register,
		handleSubmit,
		watch,
		formState: { errors },
	} = useForm();

	const router = useRouter();

	const onSubmit = async (data) => {
		if (type === "register") {
			const res = await fetch("/api/auth/register", {
				method: "POST",
				body: JSON.stringify(data),
				headers: {
					"Content-Type": "application/json",
				},
			});
			if (res.ok) {
				router.push("/");
			}
			if (res.error) {
				toast.error("Something Went Wrong");
			}
		}
	};

	return (
		<div className="auth">
			<div className="content">
				<img src="/assets/logo.png" alt="logo" className="logo" />

				<form className="form" onSubmit={handleSubmit(onSubmit)}>
					{type === "register" && (
						<div>
							<div className="input">
								<input
									defaultValue=""
									{...register("username", {
										required: "Username is required",
										validate: (value) => {
											if (value.length < 3) {
												return "Username must be at least 3 characters";
											}
										},
									})}
									type="text"
									placeholder="Username"
									className="input-field"
								/>
								<PersonOutline sx={{ color: "#737373" }} />
							</div>
							{errors.username && (
								<p className="text-red-500">
									{errors.username.message}
								</p>
							)}
						</div>
					)}
					<div>
						<div className="input">
							<input
								defaultValue=""
								{...register("email", {
									required: "Email is required",
								})}
								type="email"
								placeholder="Email"
								className="input-field"
							/>
							<EmailOutlined sx={{ color: "#737373" }} />
						</div>
						{errors.email && (
							<p className="text-red-500">
								{errors.email.message}
							</p>
						)}
					</div>
					<div>
						<div className="input">
							<input
								defaultValue=""
								{...register("password", {
									required: "Password is required",
									validate: (value) => {
										if (
											value.length < 5 ||
											!value.match(
												/[!@#$%^&*()_+{}\[\]:;<>,.?~\\/-]/
											)
										) {
											return "Password must be at least 5 characters long & must contain one special character";
										}
									},
								})}
								type="password"
								placeholder="Password"
								className="input-field"
							/>
							<LockOutlined sx={{ color: "#737373" }} />
						</div>
						{errors.password && (
							<p className="text-red-500">
								{errors.password.message}
							</p>
						)}
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
