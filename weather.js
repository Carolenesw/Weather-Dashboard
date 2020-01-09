
$(document).ready(function () {
  
var citySearch = $("#city-search");
var searchArea = $("#search-input");
var btnSearch = $(".btn");
var currentCity = $(".current-city");
var cityName = $(".city");
var dateN = $(".date"); 
var windS = $(".wind");
var tempS = $(".temp");
var uvIdex = $(".UV");
var imgN = $(".img");

//API key to run database
 var APIKey = "351b80106cd356a907301219dd0c7806";

 // API URL to query database 
 var queryURL = "https://api.openweathermap.org/data/2.5/weather?" +
   "q" + APIKey;

 // AJAX call to the run OpenWeatherMap API
 $.ajax({
   url: queryURL,
   method: "GET"
 })
   // We store all of the retrieved data inside of an object called "response"
   .then(function(response) {

  });
})