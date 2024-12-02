import { configure } from "./config.js";

await configure(); // Configure instance before launching app
const app = (await import("./app.js")).app;

const PORT = process.env.PORT;
app.listen(PORT, () => {
	console.log(`[APP] Listening on ${PORT}`);
});
