import { configure } from "./config.js";

configure();

const app = (await import("./app.js")).app;
const appInternal = (await import("./app_internal.js")).appInternal;

const AUTH_PORT = process.env.AUTH_PORT;
const AUTH_PORT_INTERNAL = process.env.AUTH_PORT_INTERNAL;

app.listen(AUTH_PORT, () => {
	console.log(`[AUTH] Listening on ${AUTH_PORT}`);
});

appInternal.listen(AUTH_PORT_INTERNAL, () => {
	console.log(`[AUTH INTERNAL] Listening on ${AUTH_PORT_INTERNAL}`);
});
