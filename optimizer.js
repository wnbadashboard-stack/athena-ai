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

        players = rows.slice(1).map(row => {

            const cols = row.split(",");

            const salary = Number(cols[5]);

            const projection = Math.round((salary / 220) + Math.random() * 8);

            const value = (projection / salary) * 1000;

            const athenaScore = Math.round(
                (projection * 0.7) +
                (value * 10)
            );

            return{

                position: cols[0],

                name: cols[2],

                salary: salary,

                team: cols[7],

                projection: projection,

                value: value.toFixed(2),

                athenaScore: athenaScore

            };

        });

        // Sort Highest Athena Score First

        players.sort((a,b)=>b.athenaScore-a.athenaScore);

        displayPlayers(players);

    };

    reader.readAsText(file);

});

function displayPlayers(list){

    results.innerHTML = `

        <h2 style="margin-bottom:20px;">
            🔥 Top Athena Plays
        </h2>

    `;

    list.forEach(player=>{

        const card=document.createElement("div");

        card.className="player-card";

        card.innerHTML=`

            <h3>${player.name}</h3>

            <p><strong>Position:</strong> ${player.position}</p>

            <p><strong>Team:</strong> ${player.team}</p>

            <p><strong>Salary:</strong> $${player.salary.toLocaleString()}</p>

            <p><strong>Projection:</strong> ${player.projection} FP</p>

            <p><strong>Value:</strong> ${player.value}x</p>

            <p><strong>Athena Score:</strong> ${player.athenaScore}</p>

            <p style="color:#3b82f6;font-weight:bold;">
                ⭐ Ranked Play
            </p>

        `;

        results.appendChild(card);

    });

}
