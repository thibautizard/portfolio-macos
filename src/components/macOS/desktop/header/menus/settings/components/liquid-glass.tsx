import { createContext, useContext } from "react";

/**
 * liquid-dom needs WebGPU *and* the experimental HTML-in-Canvas API
 * (Chrome flag: chrome://flags/#canvas-draw-element) to render DOM inside glass.
 */
const gpuQueue = (globalThis as { GPUQueue?: { prototype: object } }).GPUQueue;
export const supportsLiquidGlass =
	typeof navigator !== "undefined" &&
	"gpu" in navigator &&
	gpuQueue !== undefined &&
	"copyElementImageToTexture" in gpuQueue.prototype;

/**
 * Chrome 150+ changed `copyElementImageToTexture(element, width, height, dest)`
 * to `copyElementImageToTexture({ source }, { destination, width, height })`.
 * liquid-dom 0.1.1 still uses the old form, so translate its calls.
 * Remove once liquid-dom supports the new signature.
 */
type CopyElementImage = (...args: unknown[]) => void;
const queuePrototype = gpuQueue?.prototype as
	| { copyElementImageToTexture?: CopyElementImage }
	| undefined;
const copyElementImage = queuePrototype?.copyElementImageToTexture;
if (queuePrototype && copyElementImage?.length === 2) {
	queuePrototype.copyElementImageToTexture = function (
		this: unknown,
		...args: unknown[]
	) {
		if (args.length === 4) {
			const [source, width, height, destination] = args;
			return copyElementImage.call(
				this,
				{ source },
				{ destination, height, width },
			);
		}
		return copyElementImage.apply(this, args);
	};
}

/** When true, glass wrappers skip their CSS glass: liquid-dom draws it instead. */
const LiquidGlassContext = createContext(false);

export const LiquidGlassProvider = LiquidGlassContext.Provider;

export function useIsLiquidGlass() {
	return useContext(LiquidGlassContext);
}
