import { configure } from "./config.js";
import { app } from "./app.js";

configure();

app.listen(3000, () => {
	console.log(`[APP] Listening on 3000`);
});
