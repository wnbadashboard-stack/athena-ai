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

    reader.onload = function (event) {

        const csv = event.target.result;

        const rows = csv.trim().split("\n");

        players = rows.slice(1).map(row => {

            const cols = row.split(",");

            return {
                position: cols[0],
                name: cols[2],
                salary: Number(cols[5]),
                team: cols[7]
            };

        });

        displayPlayers(players);

    };

    reader.readAsText(file);

});

function displayPlayers(list) {

    results.innerHTML = "";

    list.forEach(player => {

        const card = document.createElement("div");

        card.className = "player-card";

        card.innerHTML = `
            <h3>${player.name}</h3>
            <p>${player.position}</p>
            <p>$${player.salary.toLocaleString()}</p>
            <p>${player.team}</p>
        `;

        results.appendChild(card);

    });

}
