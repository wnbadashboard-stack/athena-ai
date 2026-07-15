const fileInput = document.getElementById("csvFile");
const loadButton = document.getElementById("loadCSV");
const results = document.getElementById("results");

let players=[];

loadButton.addEventListener("click",()=>{

const file=fileInput.files[0];

if(!file){

alert("Choose DraftKings CSV.");

return;

}

const reader=new FileReader();

reader.onload=function(event){

const csv=event.target.result;

const rows=csv.trim().split("\n");

players=rows.slice(1).map(row=>{

const cols=row.split(",");

const salary=Number(cols[5]);

// Athena Inputs

const minutes=Math.round(24+Math.random()*14);

const fppm=(0.70+Math.random()*0.70);

const usage=Math.round(Math.random()*10-5);

const pace=Math.round(Math.random()*8-4);

const matchup=Math.round(Math.random()*8-4);

// Projection

const projection=Math.round(

(minutes*fppm)+

usage+

pace+

matchup

);

// Value

const value=(projection/(salary/1000));

// Athena Rating

const athenaScore=Math.round(

projection*0.65+

value*12

);

return{

position:cols[0],

name:cols[2],

salary,

team:cols[7],

minutes,

fppm:fppm.toFixed(2),

usage,

pace,

matchup,

projection,

value:value.toFixed(2),

athenaScore,

classification:getClassification(athenaScore)

};

});

players.sort((a,b)=>b.athenaScore-a.athenaScore);

displayPlayers(players);

};

reader.readAsText(file);

});

function getClassification(score){

if(score>=90) return "🔥 CORE PLAY";

if(score>=80) return "💎 ELITE PLAY";

if(score>=70) return "✅ STRONG PLAY";

if(score>=60) return "⚡ VALUE PLAY";

return "🚫 FADE";

}

function displayPlayers(list){

results.innerHTML="<h2>🔥 Athena AI Rankings</h2>";

list.forEach(player=>{

const card=document.createElement("div");

card.className="player-card";

card.innerHTML=`

<h3>${player.name}</h3>

<p><strong>${player.position}</strong></p>

<p>${player.team}</p>

<p>Salary: $${player.salary.toLocaleString()}</p>

<p>Minutes: ${player.minutes}</p>

<p>FPPM: ${player.fppm}</p>

<p>Projection: ${player.projection} FP</p>

<p>Value: ${player.value}x</p>

<p>Athena Rating: ${player.athenaScore}</p>

<h4>${player.classification}</h4>

`;

results.appendChild(card);

});

}
