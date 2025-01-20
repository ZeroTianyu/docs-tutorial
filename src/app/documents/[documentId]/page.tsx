interface DocumentIdPageProps {
	params: Promise<{ documentId: string }>
}

export default async function DocumentIdPage({params}: DocumentIdPageProps) {
	const {documentId} = await params;

	return (
		<div>DocumentId ID:{documentId}</div>
	)
}
