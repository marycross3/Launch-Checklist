// Write your helper functions here!
require('isomorphic-fetch');


function addDestinationInfo(document, name, diameter, star, distance, moons, imageUrl) {
    // Here is the HTML formatting for our mission target div.
    let div = document.getElementById("missionTarget");
    div.innerHTML =
                `<h2>Mission Destination</h2>
                <ol>
                    <li>Name: ${name} </li>
                    <li>Diameter:${diameter} </li>
                    <li>Star: ${star}</li>
                    <li>Distance from Earth: ${distance}</li>
                    <li>Number of Moons: ${moons}</li>
                </ol>
                <img src="${imageUrl}">`

}

function validateInput(testInput) {
    let testNumInput = Number(testInput);
    if (testInput === ""){
        return "Empty";
    } else if (isNaN(testNumInput)) {
        return "Not a Number";
    } else if (isNaN(testNumInput) === false){
        return "Is a Number";
    }
}

function formSubmission(document, list, pilot, copilot, fuelLevel, cargoLevel) {
    let launchStatus = document.getElementById("launchStatus");
    let pilotStatus = document.getElementById("pilotStatus");
    let copilotStatus = document.getElementById("copilotStatus");
    let fuelStatus= document.getElementById("fuelStatus");
    let cargoStatus=document.getElementById("cargoStatus"); 
    
    //console.log(pilotStatus);
    // let pilotName = document.getElementById("pilotName");
    // let copilotName = document.getElementById("copilotName");
    if (validateInput(pilot) === "Empty"|| validateInput(copilot) === "Empty" || validateInput(fuelLevel) === "Empty" || validateInput(cargoLevel) === "Empty"){
        alert("All fields required. ");
    } else if(validateInput(fuelLevel)=== "Not a Number" || validateInput(cargoLevel)==="Not a Number"){
        alert("Please enter valid information. ")
    } else{
        list.style.visibility = "visible";
        //console.log(list);
        //faultyItems.style.visibilty ="visible";
        pilotStatus.innerHTML= `Pilot ${pilot} is ready for launch.`;
        copilotStatus.innerHTML= `Copilot ${copilot} is ready for launch.`;
        
        if(fuelLevel<10000 && cargoLevel <= 10000){
            fuelStatus.innerHTML= `There is not enough fuel for the journey.`;
            cargoStatus.innerHTML = `Cargo mass low enough for launch`;
            launchStatus.innerHTML = `Shuttle not ready for launch`;
            launchStatus.style.color = "red";
        } else if( fuelLevel >=10000 && cargoLevel>10000){
            cargoStatus.innerHTML= `Too much mass for the shuttle to take off.`;
            launchStatus.innerHTML = `Shuttle not ready for launch`;
            fuelStatus.innerHTML =`Fuel level high enough for launch`;
            launchStatus.style.color = "red";
        } else if( fuelLevel < 10000 && cargoLevel>10000){
            cargoStatus.innerHTML= `Too much mass for the shuttle to take off.`;
            fuelStatus.innerHTML= `There is not enough fuel for the journey.`;
            launchStatus.innerHTML = `Shuttle not ready for launch`;
            launchStatus.style.color = "red";
        } else {
            launchStatus.innerHTML = `Shuttle is ready for launch`;
            fuelStatus.innerHTML =`Fuel level high enough for launch`;
            cargoStatus.innerHTML = `Cargo mass low enough for launch`;
            launchStatus.style.color = "green";
        }
}
    

}

async function myFetch() {
    let planetsReturned;

    planetsReturned = await fetch("https://handlers.education.launchcode.org/static/planets.json").then( 
        function(response) {
            //more to do here
            // if (response.status)
            return response.json();
        });

    return planetsReturned;
}

function pickPlanet(planets) {
    let i = Math.floor(Math.random()*planets.length);
    return planets[i]
}

module.exports.addDestinationInfo = addDestinationInfo;
module.exports.validateInput = validateInput;
module.exports.formSubmission = formSubmission;
module.exports.pickPlanet = pickPlanet; 
module.exports.myFetch = myFetch;
