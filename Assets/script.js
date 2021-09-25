
var APIkey = config.MY_KEY
var formEl = document.querySelector("#formInput");
var tempVal = document.querySelector("#temp");
var humidVal = document.querySelector("#humid");
var windspVal = document.querySelector("#windsp");
var uviVal = document.querySelector("#uvi");
var feelsVal = document.querySelector("#feelsLike");
var wc1Val = document.querySelector("#wc1");
var wc2Val = document.querySelector("#wc2");
var wc3Val = document.querySelector("#wc3");
var wc4Val = document.querySelector("#wc4");
var wc5Val = document.querySelector("#wc5");


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

    var humid = oneCall['daily'][0].humidity.toFixed(1);
    var temp = oneCall['daily'][0].temp['day'].toFixed(1);
    var wspeed = oneCall['daily'][0].wind_speed.toFixed(1);
    var icon = oneCall['daily'][0].weather['icon'];
    var iconAltText = oneCall['daily'][0].weather['description'];

    wc1Val.textContent = oneCall['daily'][0].temp['day'];  //temp, wind speed and h


    // wc2Val.textContent = oneCall['daily'][1].temp['day'];
    // wc3Val.textContent = oneCall['daily'][2].temp['day'];
    // wc4Val.textContent = oneCall['daily'][3].temp['day'];
    // wc5Val.textContent = oneCall['daily'][4].temp['day'];

    // wc2Val.textContent = fivedayforecast.current.humidity

    // windspVal.textContent = oneCall.current.wind_speed
    // uviVal.textContent = oneCall.current.uvi
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