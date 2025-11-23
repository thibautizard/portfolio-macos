import { createFileRoute } from "@tanstack/react-router";
export const Route = createFileRoute("/")({ component: App });

import { Layout } from "./-components/layout";

function App() {
	return <Layout />;
}
