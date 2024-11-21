document.querySelector("form").addEventListener("submit", async (event) => {
	event.preventDefault();
	
	const form = event.target;
	const data = new FormData(form);
	const jsonData = {};
	data.forEach((value, key) => {
		jsonData[key] = value;
	});
	jsonData["user_id"] = document.querySelector("#user_id").value;


	const my_form_data = new FormData();
	for (const name in jsonData) {
		formData.append(name, data[name]);
	}

	let response = await fetch(form.action, {
		method: "PUT",
		body: my_form_data,
		
	});

	if (response.status !== 200) {
		alert("Error updating article.");
		//window.location.href = "/dashboard";
	}

	response = response.json();

	window.location.href = "/dashboard";
});
