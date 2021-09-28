var APIkey = config.MY_KEY
var WeatherCardsEl = document.querySelector(".weatherCards");
var cityName = document.querySelector("#city");
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
var weatherEl = document.querySelector(".WC");
var searchesEl = document.querySelector("#recentSearches");
var buttonEl = document.querySelector("#searchBtn");
//empty array to store city
//parse is inverse of converted (string to array) (array to string is stringify)
var searchArray = JSON.parse(localStorage.getItem("searches")) || [];
console.log("searchArray", searchArray);

weatherEl = moment().format("dddd, MMMM Do YYYY")
$(".WC").text(weatherEl);

function getSearches() {
    for (let i = 0; i < searchArray.length; i++) {
        var li = document.createElement("li");
        li.textContent = searchArray[i];
        li.setAttribute("class", "city");
        searchesEl.appendChild(li);
    }

    var cities = document.querySelectorAll(".city")

    for (let i = 0; i < cities.length; i++) {
        cities[i].addEventListener("click", function () {
            getWeatherData(cities[i].textContent)
        })
    }
}

getSearches();
buttonEl.addEventListener("click", function () {

    getWeatherData(formEl.value);
})

//arrayname.includes
//sear

async function getWeatherData(citySearch) {
    //adds the search into an array
    //convert to string using jsonstringifer
    // if (searchArray.includes(citySearch)) {
    //     return
    // }
    searchArray.push(citySearch);
    getSearches();
    localStorage.setItem("searches", JSON.stringify(searchArray));
    //if there's a comma then the user has done an explicit search, otherwise put in filter for country au (e.g. melbourne, sydney)
    var city = "";
    if (!citySearch.includes(",")) {
        city = citySearch;
    }
    else {
        city = citySearch + ",AU";
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
    uviVal.textContent = oneCall.current.uvi;
    htmlContent = "";

    // function changeColour() {

    // var uvi = oneCall['daily']['uvi'];
    // if (uvi < 3) {
    //     document.getElementById("#uv1").style.backgroundColor = "green";
    // }
    // if (uvi >= 3 && uvi < 6) {
    //     document.getElementById("#uv1").style.backgroundColor = "yellow";
    // }
    // else if (uvi >= 6 && uvi < 8) {
    //     document.getElementById("#uv1").style.backgroundColor = "orange";
    // }
    // else if (uvi > 8) {
    //     document.getElementById("#uv1").style.backgroundColor = "red";
    // }

    // }

    // changeColour();


    for (var i = 0; i < oneCall['daily'].length & i < 5; i++) {
        // var forecast_time = new Date(oneCall['daily'][i].dt * 1000);
        var humid = oneCall['daily'][i].humidity.toFixed(1);
        var temp = oneCall['daily'][i].temp['day'].toFixed(1);
        var wspeed = oneCall['daily'][i].wind_speed.toFixed(1);
        var icon = "https://openweathermap.org/img/w/" + oneCall['daily'][i]['weather'][0]['icon'] + ".png";
        var iconAltText = oneCall['daily'][i]['weather'][0]['description'];
        htmlContent += `<div class="col mx-1"> <img src="${icon}" alt="${iconAltText}"/> Temp: ${temp} Windspeed ${wspeed} Humidity ${humid} <span id="wc${i}"></span> </div>`;
    }





    cityName.innerHTML = formEl.value;

    WeatherCardsEl.innerHTML = htmlContent;

    // wc1Val.textContent = oneCall['daily'][0].temp['day'];

    //temp, wind speed and h


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