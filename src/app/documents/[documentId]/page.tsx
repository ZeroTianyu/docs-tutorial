import Editor from "@/app/documents/[documentId]/editor";
import Toolbar from "@/app/documents/[documentId]/toolbar";

interface DocumentIdPageProps {
	params: Promise<{ documentId: string }>
}

export default async function DocumentIdPage({params}: DocumentIdPageProps) {
	const {documentId} = await params;

	return (
		<div className={"min-h-screen bg-[#FAFBFD]"}>
			<Toolbar/>
			<Editor/>
		</div>
	)
}
