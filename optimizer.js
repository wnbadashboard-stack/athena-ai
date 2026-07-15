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

            const salary = Number(cols[5]);

            const projection = generateProjection(salary);

            const value = projection / (salary / 1000);

            const athenaScore = Math.round(
                projection * 0.6 +
                value * 8
            );

            return {

                position: cols[0],

                name: cols[2],

                salary,

                team: cols[7],

                projection,

                value,

                athenaScore

            };

        });

        players.sort((a,b)=>b.athenaScore-a.athenaScore);

        buildLineup(players);

    };

    reader.readAsText(file);

});

function generateProjection(salary){

    return Math.round(
        salary/220 +
        Math.random()*8
    );

}

function buildLineup(players){

    let salaryCap = 50000;

    let lineup=[];

    let usedSalary=0;

    players.forEach(player=>{

        if(lineup.length>=8) return;

        if(usedSalary+player.salary<=salaryCap){

            lineup.push(player);

            usedSalary+=player.salary;

        }

    });

    displayLineup(lineup,usedSalary);

}

function displayLineup(lineup,usedSalary){

    results.innerHTML="";

    const title=document.createElement("h2");

    title.innerHTML="🏆 Athena Optimal Lineup";

    results.appendChild(title);

    const salary=document.createElement("p");

    salary.innerHTML=`Salary Used: $${usedSalary.toLocaleString()}`;

    results.appendChild(salary);

    lineup.forEach(player=>{

        const card=document.createElement("div");

        card.className="player-card";

        card.innerHTML=`

            <h3>${player.name}</h3>

            <p><strong>${player.position}</strong></p>

            <p>${player.team}</p>

            <p>$${player.salary.toLocaleString()}</p>

            <p>${player.projection} FP</p>

            <p>${player.value.toFixed(2)}x Value</p>

            <p>Athena Score ${player.athenaScore}</p>

        `;

        results.appendChild(card);

    });

}
