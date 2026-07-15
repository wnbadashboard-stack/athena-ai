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

            const projection = Math.round(salary / 220);

            const value = projection / (salary / 1000);

            const athenaScore = Math.round(
                projection * 1.1 +
                value * 4
            );

            return{

                position: cols[0],
                name: cols[2],
                salary: salary,
                team: cols[7],

                projection,
                value,
                athenaScore

            };

        });

        players.sort((a,b)=>b.athenaScore-a.athenaScore);

        displayOptimalLineup();

        displayPlayers(players);

    };

    reader.readAsText(file);

});

function displayOptimalLineup(){

    const lineup = [];

    let salary = 0;

    let projection = 0;

    for(let player of players){

        if(lineup.length===8) break;

        if(salary + player.salary <= 50000){

            lineup.push(player);

            salary += player.salary;

            projection += player.projection;

        }

    }

    const lineupDiv = document.createElement("div");

    lineupDiv.className="lineup-card";

    lineupDiv.innerHTML=`

        <h2>🏆 Athena Optimal Lineup</h2>

        ${lineup.map(player=>`

            <div class="lineup-player">

                <strong>${player.name}</strong><br>

                ${player.position}<br>

                $${player.salary.toLocaleString()}<br>

                ${player.projection} FP

            </div>

        `).join("")}

        <hr>

        <h3>Salary Used:
        $${salary.toLocaleString()}</h3>

        <h3>Remaining:
        $${(50000-salary).toLocaleString()}</h3>

        <h3>Projected:
        ${projection} FP</h3>

    `;

    results.innerHTML="";

    results.appendChild(lineupDiv);

}

function displayPlayers(list){

    list.forEach(player=>{

        const card=document.createElement("div");

        card.className="player-card";

        card.innerHTML=`

            <h3>${player.name}</h3>

            <p><strong>Position:</strong> ${player.position}</p>

            <p><strong>Team:</strong> ${player.team}</p>

            <p><strong>Salary:</strong> $${player.salary.toLocaleString()}</p>

            <p><strong>Projection:</strong> ${player.projection} FP</p>

            <p><strong>Value:</strong> ${player.value.toFixed(2)}x</p>

            <p><strong>Athena Score:</strong> ${player.athenaScore}</p>

        `;

        results.appendChild(card);

    });

}
