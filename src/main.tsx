import { StrictMode } from "react";
import ReactDOM from "react-dom/client";
import { Layout } from "@/components/macOS/desktop/layout";
import "./styles.css";
import { Provider } from "react-redux";
import { PersistGate } from "redux-persist/integration/react";
import { persistor, store } from "@/store";

const rootElement = document.getElementById("root");

if (rootElement && !rootElement.innerHTML) {
	ReactDOM.createRoot(rootElement).render(
		<StrictMode>
			<Provider store={store}>
				<PersistGate loading={null} persistor={persistor}>
					<Layout />
				</PersistGate>
			</Provider>
		</StrictMode>,
	);
}
