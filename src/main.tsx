import { StrictMode } from "react";
import ReactDOM from "react-dom/client";
import { Layout } from "@/components/desktop/layout";
import "./styles.css";

const rootElement = document.getElementById("root");

if (rootElement && !rootElement.innerHTML) {
	ReactDOM.createRoot(rootElement).render(
		<StrictMode>
			<Layout />
		</StrictMode>,
	);
}
