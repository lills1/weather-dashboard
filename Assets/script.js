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
var day = document.getElementsByClassName("day");

//empty array to store city
//parse is inverse of converted (string to array) (array to string is stringify)
var searchArray = JSON.parse(localStorage.getItem("searches")) || [];
console.log("searchArray", searchArray);

day = moment().format("dddd, MMMM Do YYYY")
$(".day").text(day);

var days = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
var Months = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Dec"];


function format_date(dt) {
    var day = days[dt.getDay()];
    var date = dt.getDate();
    var month = Months[dt.getMonth()];
    return day + "," + month + "," + date;

}

function getSearches() {
    searchesEl.textContent = "";
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
    var IncludeCity = searchArray.includes(citySearch);
    if (!IncludeCity) {
        searchArray.push(citySearch)
    };
    getSearches();
    localStorage.setItem("searches", JSON.stringify(searchArray));
    var city = "";
    if (!citySearch.includes(",")) {
        city = citySearch;
    } else {
        city = citySearch + ",AU";
    }

    // var fivedayforecast = await fetch (`https://api.openweathermap.org/data/2.5/forecast?q=${city}&appid=${APIkey}&units=metric`)
    // .then(response => response.json())


    fetch(`https://api.openweathermap.org/data/2.5/forecast?q=${city}&appid=${APIkey}&units=metric`)
        .then(response => {
            // handle the response
            console.log(response);
            console.log(response.status); // 200
            console.log(response.statusText); // OK
            // Flag error if http status != 200
            if (response.status != 200) {
                searchesEl.textContent = "";
                cityName.innerHTML = "please enter a valid city";
                console.log("error!!!!!!!!");
            }
            // only process if the http status is 200
            if (response.status == 200)
                response.json().then(function (fivedayforecast) {

                    fetch(`https://api.openweathermap.org/data/2.5/onecall?exclude=minutely,hourly,alerts&lat=${fivedayforecast.city.coord.lat}&lon=${fivedayforecast.city.coord.lon}&appid=${APIkey}&units=metric`)
                        .then(response => {
                            // handle the response
                            response.json().then(function (oneCall) {

                                // console.log(fivedayforecast)
                                // var oneCall = await fetch(`https://api.openweathermap.org/data/2.5/onecall?exclude=minutely,hourly,alerts&lat=${fivedayforecast.city.coord.lat}&lon=${fivedayforecast.city.coord.lon}&appid=${APIkey}&units=metric`)
                                //     .then(response => response.json())
                                // if (citySearch != oneCall || fivedayforecast) {
                                //     cityName.innerHTML = "please enter a valid city";
                                // }

                                console.log(oneCall)
                                tempVal.textContent = oneCall.current.temp + " Celsius "
                                feelsVal.textContent = oneCall.current.feels_like + " Celsius   "
                                humidVal.textContent = oneCall.current.humidity + " % "
                                windspVal.textContent = oneCall.current.wind_speed + " KM/H "
                                uviVal.textContent = oneCall.current.uvi;
                                htmlContent = "";

                                var uvi = oneCall.current.uvi;
                                console.log("uvi:" + uvi);
                                if (uvi < 3) {
                                    document.getElementById("uv1").style.backgroundColor = "green";
                                }
                                if (uvi >= 3 && uvi < 6) {
                                    document.getElementById("uv1").style.backgroundColor = "yellow";
                                } else if (uvi >= 6 && uvi < 8) {
                                    document.getElementById("uv1").style.backgroundColor = "orange";
                                } else if (uvi > 8) {
                                    document.getElementById("uv1").style.backgroundColor = "red";
                                }



                                for (var i = 0; i < oneCall['daily'].length & i < 5; i++) {
                                    // var forecast_time = new Date(oneCall['daily'][i].dt * 1000);
                                    // var date = document.createElement("li");
                                    // var DateInfo = fivedayforecast.list[i].dt_txt;
                                    // date.textContent = "Date: " + DateInfo[0];
                                    var forecasetTime = new Date(oneCall['daily'][i].dt * 1000);
                                    var dateInfo = format_date(forecasetTime);
                                    var humid = oneCall['daily'][i].humidity.toFixed(1);
                                    var temp = oneCall['daily'][i].temp['day'].toFixed(1);
                                    var wspeed = oneCall['daily'][i].wind_speed.toFixed(1);
                                    var icon = "https://openweathermap.org/img/w/" + oneCall['daily'][i]['weather'][0]['icon'] + ".png";
                                    var iconAltText = oneCall['daily'][i]['weather'][0]['description'];
                                    htmlContent += `<div class="col mx-1"> <img src="${icon}" alt="${iconAltText}"/> Date: ${dateInfo} Temp: ${temp} Windspeed ${wspeed} Humidity ${humid} <span id="wc${i}"></span> </div>`;
                                }

                                cityName.innerHTML = formEl.value;

                                WeatherCardsEl.innerHTML = htmlContent;
                            })// close response of oneapi
                        }) //closes success oneapi
                        .catch(error => {
                            cityName.innerHTML = "please enter a valid city";
                            console.log(error);
                            // handle the error
                        });

                    // wc1Val.textContent = oneCall['daily'][0].temp['day'];
                }) // close response of forecast
        })// close success of forecast
        .catch(error => {
            cityName.innerHTML = "please enter a valid city";
            console.log("error!!!!!!!!");
            // handle the error
        });
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