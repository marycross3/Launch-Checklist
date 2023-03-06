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
    
    
    if (
        validateInput(pilot) === "Empty" || 
        validateInput(copilot) === "Empty" || 
        validateInput(fuelLevel) === "Empty" || 
        validateInput(cargoLevel) === "Empty"){
        alert("All fields required. ");
    } else if(validateInput(fuelLevel)=== "Not a Number" || 
    validateInput(cargoLevel)==="Not a Number"||
    validateInput(pilot) === "Is a Number" ||
    validateInput(copilot) === "Is a Number"){
        alert("Please enter valid information. ")
    } else{
        list.style.visibility = "visible";
        pilotStatus.innerHTML= `Pilot ${pilot} is ready for launch`;
        copilotStatus.innerHTML= `Co-pilot ${copilot} is ready for launch`;
        
        if(fuelLevel<10000 && cargoLevel <= 10000){
            fuelStatus.innerHTML= `Fuel level too low for launch`;
            cargoStatus.innerHTML = `Cargo mass low enough for launch`;
            launchStatus.innerHTML = `Shuttle Not Ready for Launch`;
            launchStatus.style.color = "rgb(199, 37, 78)";
        } else if( fuelLevel >=10000 && cargoLevel>10000){
            fuelStatus.innerHTML =`Fuel level high enough for launch`;
            cargoStatus.innerHTML= `Cargo mass too heavy for launch`;
            launchStatus.innerHTML = `Shuttle Not Ready for Launch`;
            launchStatus.style.color = "rgb(199, 37, 78)";
        } else if( fuelLevel < 10000 && cargoLevel>10000){
            fuelStatus.innerHTML= `Fuel level too low for launch`;
            cargoStatus.innerHTML= `Cargo mass too heavy for launch`;
            launchStatus.innerHTML = `Shuttle Not Ready for Launch`;
            launchStatus.style.color = "rgb(199, 37, 78)";
        } else {
            fuelStatus.innerHTML =`Fuel level high enough for launch`;
            cargoStatus.innerHTML = `Cargo mass low enough for launch`;
            launchStatus.innerHTML = `Shuttle is Ready for Launch`;
            launchStatus.style.color = "rgb(65, 159, 106)";
        }
}
    

}

async function myFetch() {
    let planetsReturned;

    planetsReturned = await fetch("https://handlers.education.launchcode.org/static/planets.json").then( 
        function(response) {
            //more to do here

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
