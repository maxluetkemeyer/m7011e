import { configure } from "../src/config.js";
import { app } from "./app.js";

configure();

app.listen(3001, () => {
	console.log(`[AUTH] Listening on 3001`);
});
