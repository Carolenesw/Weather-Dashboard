
$(document).ready(function () {
  //create variables for selection 
  var citySearch = $("#city-search");
  var searchArea = "";
  var btnSearch = $("#btn");
  var currentCity = $("#current-city");
  var cityName = $(".city");
  var dateN = $(".date");
  var windS = $(".wind");
  var tempS = $(".temp");
  var humRead = $(".humidity")
  var uvIdex = $(".UV");
  var imgN = $(".img");
  var cityArray = [];
  //searchArea = "";

  // use moment.js to get date format
  var d = moment().format('L');

  console.log(d);


  //API key to run database
  var APIKey = "351b80106cd356a907301219dd0c7806";


  // AJAX call to the run OpenWeatherMap API

  //console.log(queryURL);

  // set result to HTML page 
  var storedCity = localStorage.getItem("cityName");
  cityName.text(storedCity);

  var storedTemp = localStorage.getItem("temperature");
  tempS.text(storedTemp);

  var storedHumidity = localStorage.getItem("humidity");
  humRead.text(storedHumidity);

  var storedWind = localStorage.getItem("wind speed");
  windS.text(storedWind);


  //second example
  // tempS.text(localStorage.getItem("temperature"))

  $("#btn").on("click", function (event) {
    event.preventDefault();

    // This line get the info from the text area
    searchArea = $("#search-input").val().trim();
    
    // console.log(cityName)



    var queryURL = "https://api.openweathermap.org/data/2.5/weather?q=" + searchArea + "&units=imperial&appid=" + APIKey;
    $.ajax({
      url: queryURL,
      method: "GET"
    })
      // We store all of the retrieved data inside of an object called "response" and add required items and variables 
      .then(function (response) {
        console.log(response);
        //Stored data to local storage 
        localStorage.setItem("cityName", searchArea + " " + "(" + d + ")");
        // localStorage.setItem("TempS", response.main.temp);
        localStorage.setItem("temperature", "Temperature: " + response.main.temp + " F");
        localStorage.setItem("humidity", "Humidity: " + response.main.humidity);
        // localStorage.setItem("Humidity: ", response.main.humidity);
        // localStorage.setItem("Wind Speed: " + response.wind.speed + " MPH");
        localStorage.setItem("wind speed", "Wind-Speed: " + response.wind.speed + " MPH");


        //show search results on html page  
        $(".city").text(response.name + " " + "(" + d + ")");
        $(".img").text("Icon: " + response.main.icon);
        $(".temp").text("Temperature: " + response.main.temp + " F");
        $(".humidity").text("Humidity: " + response.main.humidity);
        $(".wind").text("Wind Speed: " + response.wind.speed + " MPH");
        $(".UV").text("UV Index: ");

cityName.push(searchArea)
// $("#search-input").append(searchArea);


        // userSelection = response.cityName
        // for (var i = 0; i < cityName.length; i++) {
        //   console.log(userSelection);

        // }
      });


  });

});

