function solve() {
    var departBtn = document.getElementById('depart');
    var arrivalbtn = document.getElementById('arrive');
    var stopName = document.getElementsByClassName('info')[0];
    let nextStop = {
        next: 'depot'
    };

    async function depart() {
        var url = `http://localhost:3030/jsonstore/bus/schedule/${nextStop.next}`
        const response = await fetch(url);
        var data = await response.json();
        var stopName = document.getElementsByClassName('info')[0];

        stopName.textContent = data.name

        nextStop=data;

        departBtn.disabled = true;
        arrivalbtn.disabled = false;
    }

    function arrive() {
        departBtn.disabled = false;
        arrivalbtn.disabled = true;
        console.log('inside arrive function')
        stopName.textContent = `Arriving at ${nextStop.name}`;
    }

    return {
        depart,
        arrive
    };
}

let result = solve();