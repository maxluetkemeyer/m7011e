import { configure } from "./config.js";

configure();

const app = (await import("./app.js")).app;
const appInternal = (await import("./app_internal.js")).appInternal;

const AUTH_PORT = process.env.AUTH_PORT;
const AUTH_SERVICE_PORT = process.env.AUTH_SERVICE_PORT;

app.listen(AUTH_PORT, () => {
	console.log(`[AUTH] Listening on ${AUTH_PORT}`);
});

appInternal.listen(AUTH_SERVICE_PORT, () => {
	console.log(`[AUTH INTERNAL] Listening on ${AUTH_SERVICE_PORT}`);
});
