export function configure() {
	const [major, minor, patch] = process.versions.node.split(".").map(Number);

	if (major < 23) {
		console.debug(major, minor, patch);
		throw new Error("Node.js version 23 or higher is required.");
	}
}
