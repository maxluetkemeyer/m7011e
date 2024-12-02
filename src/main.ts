import { configure } from "./config.js";

await configure();
const app = (await import("./app.js")).app;

const PORT = process.env.PORT;
app.listen(PORT, () => {
	console.log(`[APP] Listening on ${PORT}`);
});
