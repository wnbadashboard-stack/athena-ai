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

status.innerHTML =
results.data.length +
" Players Loaded";

console.log(results.data);

}

});

});
