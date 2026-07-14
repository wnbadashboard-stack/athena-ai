const fileInput =
document.getElementById("csvFile");

const status =
document.getElementById("status");

document
.getElementById("loadCSV")
.addEventListener("click", () => {

const file =
fileInput.files[0];

if (!file){

status.innerHTML =
"Please choose a CSV.";

return;

}

Papa.parse(file, {

header:true,

complete:function(results){

status.innerHTML = `
✅ DraftKings CSV Loaded

<br><br>

${results.data.length} Players Ready

<br><br>

Athena Analysis Ready
`;

console.log(results.data);

}

});

});
