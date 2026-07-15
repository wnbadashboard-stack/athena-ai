const fileInput = document.getElementById("csvFile");
const loadButton = document.getElementById("loadCSV");
const results = document.getElementById("results");

let players = [];

loadButton.addEventListener("click", () => {

    const file = fileInput.files[0];

    if (!file) {
        alert("Choose a DraftKings salary CSV first.");
        return;
    }

    const reader = new FileReader();

    reader.onload = function(event){

        const csv = event.target.result;

        const rows = csv.trim().split("\n");

        players = rows.slice(1).map(row=>{

            const cols = row.split(",");

            const salary = Number(cols[5]);

            const valueScore = calculateValue(salary);

            return{

                position: cols[0],

                name: cols[2],

                salary: salary,

                team: cols[7],

                value: valueScore

            };

        });

        players.sort((a,b)=>b.value-a.value);

        displayPlayers(players);

    };

    reader.readAsText(file);

});

function calculateValue(salary){

    let score = 0;

    score += Math.random()*50;

    score += (15000-salary)/300;

    return Number(score.toFixed(2));

}

function displayPlayers(list){

    results.innerHTML="";

    list.forEach(player=>{

        const card=document.createElement("div");

        card.className="player-card";

        card.innerHTML=`

            <h3>${player.name}</h3>

            <p><strong>Position:</strong> ${player.position}</p>

            <p><strong>Salary:</strong> $${player.salary.toLocaleString()}</p>

            <p><strong>Team:</strong> ${player.team}</p>

            <p><strong>Athena Score:</strong> ${player.value}</p>

        `;

        results.appendChild(card);

    });

}
