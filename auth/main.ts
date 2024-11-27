import { configure } from "../src/config.js";
import { app } from "./app.js";

configure();

app.listen(3001, () => {
	console.log(`Example app listening on port 3001`);
});
