import Link from "next/link";

export default function Home() {
	return (
		<div className={"flex min-h-screen items-center justify-center"}>
			点击<Link href={"/documents/123"}><span className={"text-blue-500 underline"}>这里</span></Link>跳转到文章ID
		</div>
	);
}
