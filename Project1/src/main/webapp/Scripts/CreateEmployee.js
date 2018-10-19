/**
 * CreateEmployee javascript
 */

//console.log("Hello World from createemployee.js");

function sendAjaxGet(url, func){
	let xhr = new XMLHttpRequest() || new ActiveXObject("Microsoft.HTTPRequest");
	xhr.onreadystatechange = function(){
		if(this.readyState==4 && this.status==200){
			func(this);
		}
	}

	//now we want to call open method
	xhr.open("GET", url);
	xhr.send();
}

sendAjaxGet("http://localhost:8082/Project1/new", display);

function addRow(name, location, department){
	let row = document.createElement("tr");

	let cell1 = document.createElement("td");
	let cell2 = document.createElement("td");
	let cell3 = document.createElement("td");

	row.appendChild(cell1);
	row.appendChild(cell2);
	row.appendChild(cell3);

	cell1.innerHTML = name;
	cell2.innerHTML = location;
	cell3.innerHTML = department;

	document.getElementById("table").appendChild(row);
}

document.getElementById("form-sub").addEventListener("click", addNew);

function addNew(){
	let name = document.getElementById("name").value;
	let location = document.getElementById("location").value;
	let department = document.getElementById("department").value;

	console.log(`name is ${name} and location is ${major} and department is ${major}`);

	addRow(name, location, department);
}

function display(xhr){
	employees = JSON.parse(xhr.responseText);
	//console.log(employees)
	employeeArr = employees.employees;

	let table = document.getElementById("table");

	for(i in employeeArr){
		let newRow = document.createElement("tr");

		//some of these locations are null
		if(employeeArr[i].location){
			loc = `${employeeArr[i].location.city}, ${employeeArr[i].location.state}`;
		} else {
			loc = "n/a";
		}

		if(employeeArr[i].department){
			dpt = employeeArr[i].department.name;
		} else {
			dpt = "n/a";
		}

		newRow.innerHTML = `<td>${employeeArr[i].name} </td>
			<td> ${loc} </td>
			<td> ${dpt} </td> `;

		table.appendChild(newRow);	
	}

}