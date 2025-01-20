import React from "react";

interface AuthLayoutProps {
	children: React.ReactNode;
}


export default function AuthLayout({children}: AuthLayoutProps) {
	return (
		<div className={"flex flex-col gap-y-4"}>
			<nav className={"w-full bg-green-400"}>Auth navbar</nav>
			{children}
		</div>
	)
}
