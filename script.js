// Write your JavaScript code here!

//const { pickPlanet, addDestinationInfo } = require("./scriptHelper");

//const { myFetch } = require("./scriptHelper");

//const { formSubmission } = require("./scriptHelper");

window.addEventListener("load", function() {
    // let pilotName = document.getElementById("pilotName");
    // let copilotName = document.getElementById("copilotName");
    let form = document.querySelector("form");
    let list = document.getElementById("faultyItems");
    

    let listedPlanets;
    // Set listedPlanetsResponse equal to the value returned by calling myFetch()
    let listedPlanetsResponse = myFetch();
    listedPlanetsResponse.then(function (result) {
        listedPlanets = result;
        console.log(listedPlanets);
    }).then(function () {
        console.log(listedPlanets);
        let planetPicked = pickPlanet(listedPlanets);
        addDestinationInfo(document,planetPicked.name, planetPicked.diameter,planetPicked.star,planetPicked.distance, planetPicked.moons, planetPicked.image);
    });

form.addEventListener("submit", function(event) {
    event.preventDefault();
    let pilot = document.querySelector("input[name=pilotName]").value;
    let copilot = document.querySelector("input[name=copilotName]").value;
    let fuelLevel = document.querySelector("input[name=fuelLevel]").value;
    let cargoLevel = document.querySelector("input[name=cargoMass]").value;
    formSubmission(document, list, pilot, copilot, fuelLevel, cargoLevel);
    
});
        // Below this comment call the appropriate helper functions to pick a planet fom 
        //the list of planets and add that information to your destination.
    

});