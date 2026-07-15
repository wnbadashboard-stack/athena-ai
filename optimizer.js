// Athena Optimizer v2
// Sprint 15

const fileInput = document.getElementById("csvFile");
const loadButton = document.getElementById("loadCSV");
const results = document.getElementById("results");

let players = [];

loadButton.addEventListener("click", () => {

    const file = fileInput.files[0];

    if (!file) {

        alert("Choose a DraftKings CSV first.");

        return;

    }

    const reader = new FileReader();

    reader.onload = function (event) {

        const csv = event.target.result;

        const rows = csv.trim().split("\n");

        players = rows.slice(1).map(row => {

            const cols = row.split(",");

            const salary = Number(cols[5]);

            // --------------------------
            // Athena Projection Engine
            // --------------------------

            const minutes = random(22,38);

            const fppm = randomFloat(.70,1.45);

            const usage = random(-3,8);

            const pace = random(-4,6);

            const matchup = random(-5,5);

            const projection = Math.round(

                (minutes*fppm)+

                usage+

                pace+

                matchup

            );

            const ceiling = projection + random(6,16);

            const floor = projection - random(5,12);

            const value = Number(

                (projection/(salary/1000)).toFixed(2)

            );

            const athena = Math.round(

                projection*.60+

                value*12+

                ceiling*.15

            );

            return{

                position:cols[0],

                name:cols[2],

                salary,

                team:cols[7],

                minutes,

                fppm:fppm.toFixed(2),

                projection,

                ceiling,

                floor,

                value,

                athena,

                label:getLabel(athena)

            };

        });

        players.sort((a,b)=>b.athena-a.athena);

        render(players);

    };

    reader.readAsText(file);

});

// -----------------------

function render(players){

results.innerHTML="<h2>🏛 Athena Rankings</h2>";

players.forEach(player=>{

const card=document.createElement("div");

card.className="player-card";

card.innerHTML=`

<h3>${player.name}</h3>

<p><strong>${player.position}</strong></p>

<p>${player.team}</p>

<hr>

<p>Salary: $${player.salary.toLocaleString()}</p>

<p>Minutes: ${player.minutes}</p>

<p>FPPM: ${player.fppm}</p>

<p>Projection: ${player.projection}</p>

<p>Ceiling: ${player.ceiling}</p>

<p>Floor: ${player.floor}</p>

<p>Value: ${player.value}x</p>

<p>Athena Rating: ${player.athena}</p>

<h4>${player.label}</h4>

`;

results.appendChild(card);

});

}

// -----------------------

function getLabel(score){

if(score>=95) return "🔥 CORE PLAY";

if(score>=85) return "💎 ELITE";

if(score>=75) return "✅ STRONG";

if(score>=65) return "⚡ VALUE";

return "🚫 FADE";

}

function random(min,max){

return Math.floor(Math.random()*(max-min+1))+min;

}

function randomFloat(min,max){

return (Math.random()*(max-min)+min);

}
