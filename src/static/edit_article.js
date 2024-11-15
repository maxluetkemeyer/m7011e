document.querySelector("form").addEventListener("submit", async (event) => {
	event.preventDefault();
	const form = event.target;
	const data = new FormData(form);
	const jsonData = {};
	data.forEach((value, key) => {
		jsonData[key] = value;
	});
	jsonData["user_id"] = document.querySelector("#user_id").value;

	let response = await fetch(form.action, {
		method: "PUT",
		headers: {
			"Content-Type": "application/json",
		},
		body: JSON.stringify(jsonData),
	});

	if (response.status !== 200) {
		alert("Error updating article.");
		//window.location.href = "/dashboard";
	}

	response = response.json();

	window.location.href = "/dashboard";
});
