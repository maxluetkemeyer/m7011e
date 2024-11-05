import { configure } from "./config.ts";
import { app } from "./app.ts";

configure();


app.listen(3000, () => {
	console.log(`Example app listening on port 3000`);
});
