
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
  var weatherImg = $(".img");
  var cityArray = JSON.parse(localStorage.getItem("cityArray")) || [];
  var searchInput = $("#search-input");
  //searchArea = "";
  var cityButton = $("#city-button");
  var weatherIcon = new Skycons

  // use moment.js to get date format
  var d = moment().format('LLLL');
  $(".date").append(d);

  console.log(d);
  console.log(cityArray);

  //API key to run database
  var APIKey = "351b80106cd356a907301219dd0c7806";


  renderButton();

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

  // AJAX call to the run OpenWeatherMap API for current weather 
  $("#btn").on("click", function (event) {
    event.preventDefault();

    // This line get the info from the text area
    searchArea = $("#search-input").val().trim();

    var queryURL = "https://api.openweathermap.org/data/2.5/weather?q=" + searchArea + "&units=imperial&appid=" + APIKey;
    $.ajax({
      url: queryURL,
      method: "GET"
    })
      // We store all of the retrieved data inside of an object called "response" and add required items and variables 
      .then(function (response) {
        console.log(response);
        //Stored data to local storage 
        localStorage.setItem("cityName", searchArea);
        localStorage.setItem("temperature", "Temperature: " + response.main.temp + " F");
        localStorage.setItem("humidity", "Humidity: " + response.main.humidity);
        localStorage.setItem("wind speed", "Wind-Speed: " + response.wind.speed + " MPH");
        // weatherIcon.play()
        
        //show search results on html page  
        renderWeather(response);

        // for (var i = 0; i < cityName.length; i++) {
        //   console.log(userSelection);

        // }
      });

    // stored user city selection in a empty array

    cityArray.push(searchArea);
    renderButton();
    localStorage.setItem("cityArray", JSON.stringify(cityArray));
    console.log(cityArray);


    // AJAX call to the run OpenWeatherMap API for 5 days forecast 
    var queryURLd = "https://api.openweathermap.org/data/2.5/forecast?q=" + searchArea + "&units=imperial&appid=" + APIKey;

    $.ajax({ 
      url: queryURLd,
      method: "GET"
      
    })
    // // We store all of the retrieved data inside of an object called "data" and add required items and variables 
    .then(function (data) {
      console.log(data);

      // localStorage.setItem("cityName", searchArea);
      //   localStorage.setItem("temperature", "Temperature: " + response.main.temp + " F");
      //   localStorage.setItem("humidity", "Humidity: " + response.main.humidity);
      //   localStorage.setItem("wind speed", "Wind-Speed: " + response.wind.speed + " MPH");
    });

  });

  //create function to to save city search by looping then prepend each button selected 
  function renderButton() {
    cityButton.empty();
    for (var i = 0; i < cityArray.length; i++) {
      var button = $("<button>");
      button.text(cityArray[i]);
      cityButton.prepend(button);

    }
  }

  function renderWeather(response) {
    var city = response.name;
    var temp = response.main.temp;
    var humidity = response.main.humidity;
    var windSpeed = response.wind.speed;
    
    var cityLable = city;
    var tempLable = "Temperature: " + temp + " F";
    var humLable = "Humidity: " + humidity;
    var windLable = "Wind Speed: " + windSpeed + " MPH";
    

    //call variables to show data changes 
    cityName.text(cityLable);
    tempS.text(tempLable);
    humRead.text(humLable);
    windS.text(windLable);

    // var imgSource = "http://openweathermap.org/img/wn/" + response.weather[2].icon+".png>";
    // + "<img src=\"http://openweathermap.org/img/wn/"+ response.weather[2].icon+".png>\"");

    // $(".temp").text(tempLable);
    // $(".humidity").text(humLable);
    // $(".wind").text(windLable);
    // $(".UV").text("UV Index: ");
  }

  
});

