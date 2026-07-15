const fileInput = document.getElementById("csvFile");
const loadButton = document.getElementById("loadCSV");
const results = document.getElementById("results");

let players = [];

// Load DraftKings CSV
loadButton.addEventListener("click", () => {

    const file = fileInput.files[0];

    if (!file) {
        alert("Please select a DraftKings salary CSV.");
        return;
    }

    Papa.parse(file, {

        header: true,
        skipEmptyLines: true,

        complete: function(response) {

            players = response.data.map(player => {

                const salary = Number(player.Salary);

                // Temporary projection model
                const projection =
                    Math.round(
                        (salary / 1000) * 4.2 +
                        Math.random() * 8
                    );

                const value =
                    (projection / (salary / 1000)).toFixed(2);

                const athenaScore =
                    Math.round(
                        projection * 0.70 +
                        value * 10
                    );

                return {

                    name: player.Name,

                    position: player.Position,

                    team: player.TeamAbbrev,

                    salary: salary,

                    projection: projection,

                    value: value,

                    athenaScore: athenaScore

                };

            });

            // Highest Athena Score first
            players.sort((a, b) => b.athenaScore - a.athenaScore);

            displayPlayers(players);

        }

    });

});

// Display Player Cards
function displayPlayers(list) {

    results.innerHTML = "";

    list.forEach(player => {

        const card = document.createElement("div");

        card.className = "player-card";

        card.innerHTML = `

            <h3>${player.name}</h3>

            <p><strong>Position:</strong> ${player.position}</p>

            <p><strong>Team:</strong> ${player.team}</p>

            <p><strong>Salary:</strong> $${player.salary.toLocaleString()}</p>

            <p><strong>Projection:</strong> ${player.projection} FP</p>

            <p><strong>Value:</strong> ${player.value}x</p>

            <p><strong>Athena Score:</strong> ${player.athenaScore}</p>

        `;

        results.appendChild(card);

    });

}
