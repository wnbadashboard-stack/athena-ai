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

    Papa.parse(file, {

        header: true,

        skipEmptyLines: true,

        complete: function(response) {

            players = response.data.map(player => ({

                name: player.Name,

                position: player.Position,

                salary: Number(player.Salary),

                team: player.TeamAbbrev

            }));

            displayPlayers(players);

        }

    });

});

function displayPlayers(list) {

    results.innerHTML = "";

    list.forEach(player => {

        results.innerHTML += `

        <div class="player-card">

            <h3>${player.name}</h3>

            <p><strong>Position:</strong> ${player.position}</p>

            <p><strong>Salary:</strong> $${player.salary.toLocaleString()}</p>

            <p><strong>Team:</strong> ${player.team}</p>

        </div>

        `;

    });

}
