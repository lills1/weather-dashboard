
var APIkey = config.MY_KEY
var formEl = document.querySelector("#formInput");
var tempVal = document.querySelector("#temp");
var humidVal = document.querySelector("#humid");
var windspVal = document.querySelector("#windsp");
var uviVal = document.querySelector("#uvi");
var feelsVal = document.querySelector("#feelsLike");
var maxTempval = document.querySelector("#maxTemp");
var minTempval = document.querySelector("#minTemp");

async function getWeatherData() {
    //if there's a comma then the user has done an explicit search, otherwise put in filter for country au (e.g. melbourne, sydney)
    var city = "";
    if (formEl.value.includes(",")) {
        city = formEl.value;
    }
    else {
        city = formEl.value + ",AU";
    }

    var fivedayforecast = await fetch(`https://api.openweathermap.org/data/2.5/forecast?q=${city}&appid=${APIkey}&units=metric`)
        .then(response => response.json())
    console.log(fivedayforecast)
    var oneCall = await fetch(`https://api.openweathermap.org/data/2.5/onecall?lat=${fivedayforecast.city.coord.lat}&lon=${fivedayforecast.city.coord.lon}&appid=${APIkey}&units=metric`)
        .then(response => response.json())
    console.log(oneCall)
    tempVal.textContent = oneCall.current.temp + " Celsius"
    feelsVal.textContent = oneCall.current.feels_like + " Celsius"
    // maxTempval.textContent = oneCall.current.max + " Celsius"
    // minTempval.textContent = oneCall.current.min + " Celsius"
    humidVal.textContent = oneCall.current.humidity
    windspVal.textContent = oneCall.current.wind_speed
    uviVal.textContent = oneCall.current.uvi
}


//json
//import config.js in script.js
//creat webform
//onsubmit extract search
//call api to get data on city
//loop through json and build 5 day forecast with date time, max,min
//add search to local storage
//update recent searches
//bonus: tally how many times a city has been searched, keep max of 20 items and remove least used