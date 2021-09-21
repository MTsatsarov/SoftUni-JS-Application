async function getInfo() {
    var ul = document.getElementById('buses');
    ul.innerHTML = '';
    var stopId = document.getElementById('stopId').value;
    var url = `http://localhost:3030/jsonstore/bus/businfo/${stopId}`;
    var stopName = document.getElementById('stopName');
    try {
        const response = await fetch(url)
        const result = await response.json();
        console.log(result)
        
        stopName.textContent = result.name;

        console.log(ul);
        Object.entries(result.buses).map(([bus, time]) => {
            var liElement = document.createElement('li');
            liElement.textContent = `Bus ${bus} arrives in ${time} minutes`;
            ul.appendChild(liElement);
        });
    } catch (error) {
        stopName.textContent = 'Error';
    }

}