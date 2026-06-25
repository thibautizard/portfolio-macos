import tailwindcss from "@tailwindcss/vite";
import viteReact from "@vitejs/plugin-react";
import { defineConfig } from "vite";

const config = defineConfig({
	plugins: [tailwindcss(), viteReact()],
	resolve: {
		// native replacement for vite-tsconfig-paths (resolves the "@/*" alias)
		tsconfigPaths: true,
	},
});

export default config;
