import { configure } from "./config.js";
import { app } from "./app.js";

configure();

app.listen(3000, () => {
	console.log(`Example app listening on port 3000`);
});
