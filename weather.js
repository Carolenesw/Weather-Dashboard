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

  // set result to HTML page 
  var storedCity = localStorage.getItem("cityName");
  cityName.text(storedCity);

  var storedTemp = localStorage.getItem("temperature");
  tempS.text(storedTemp);

  var storedHumidity = localStorage.getItem("humidity");
  humRead.text(storedHumidity);

  var storedWind = localStorage.getItem("wind speed");
  windS.text(storedWind);

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
      // We store all of the retrieved data inside of an object called "response" and add required items to id from object
      .then(function (response) {
        console.log(response);
        //Stored data to local storage 
        localStorage.setItem("cityName", searchArea);
        localStorage.setItem("temperature", "Temperature: " + response.main.temp + " F");
        localStorage.setItem("humidity", "Humidity: " + response.main.humidity + "%");
        localStorage.setItem("wind speed", "Wind-Speed: " + response.wind.speed + " MPH");
        // weatherIcon.play()

        //show search results on html page  
        renderWeather(response);


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
      // // We store all of the retrieved data inside of an object called "data" and and pull each set of data from the following arrays. 
      .then(function (data) {
        console.log(data);
        // console.log(data.list[0]);
        // console.log(data.list[1]);
        // console.log(data.list[2]);
        // console.log(data.list[3]);
        // console.log(data.list[4]);

        var dayOne = $(".badge1");
        var dayTwo = $(".badge2");

        //create future date for forecast
        // var dayAhead = moment().format('L');
        // $(".badge1").append(dayAhead);
        // $(".badge2").append(dayAhead);
        // $(".badge3").append(dayAhead);
        // $(".badge4").append(dayAhead);
        // $(".badge5").append(dayAhead);

        //set five day forcast data to local storage 
        //day one data 
        localStorage.setItem("temp", "Temp: " + data.list[0].main.temp + "F" + "");
        localStorage.setItem("humid", "humid: " + data.list[0].main.humidity + "%");
        localStorage.setItem("time", "Time: " + data.list[0].dt_txt);
        //day two data
        localStorage.setItem("temp1", "Temp1: " + data.list[6].main.temp + "F" + "");
        localStorage.setItem("humid1", "humid1: " + data.list[6].main.humidity + "%");
        localStorage.setItem("time", "Time: " + data.list[6].dt_txt);
        //day three data 
        localStorage.setItem("temp2", "Temp2: " + data.list[12].main.temp + "F" + "");
        localStorage.setItem("humid2", "humid2: " + data.list[12].main.humidity + "%");
        localStorage.setItem("time", "Time: " + data.list[12].dt_txt);
        //day four data 
        localStorage.setItem("temp3", "Temp3: " + data.list[18].main.temp + "F" + "");
        localStorage.setItem("humid3", "humid3: " + data.list[18].main.humidity + "%");
        localStorage.setItem("time", "Time: " + data.list[18].dt_txt);
        //day five data 
        localStorage.setItem("temp4", "Temp4: " + data.list[24].main.temp + "F" + "");
        localStorage.setItem("humid4", "humid4: " + data.list[24].main.humidity + "%");
        localStorage.setItem("time", "Time: " + data.list[24].dt_txt);

        //append data from local storage to respective badge 
        $(".badge1").append("Temp: " + data.list[0].main.temp + "F" + "");
        $(".badge1").append("Humid: " + data.list[0].main.humidity + "%");
        $(".badge1").append("Time: " + data.list[0].dt_txt);

        $(".badge2").append("Temp: " + data.list[6].main.temp + "F" + "");
        $(".badge2").append("Humid: " + data.list[6].main.humidity + "%");
        $(".badge2").append("Time: " + data.list[6].dt_txt);

        $(".badge3").append("Temp: " + data.list[14].main.temp + "F" + "");
        $(".badge3").append("Humid: " + data.list[14].main.humidity + "%");
        $(".badge3").append("Time: " + data.list[14].dt_txt);

        $(".badge4").append("Temp: " + data.list[22].main.temp + "F" + "");
        $(".badge4").append("Humid: " + data.list[22].main.humidity + "%");
        $(".badge4").append("Time: " + data.list[22].dt_txt);

        $(".badge5").append("Temp: " + data.list[30].main.temp + "F " + "");
        $(".badge5").append("Humid: " + data.list[30].main.humidity + "%");
        $(".badge5").append("Time: " + data.list[30].dt_txt);


      });
    //create a loop to set response to only cuurent time instead of three hours
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
    var humLable = "Humidity: " + humidity + "%";
    var windLable = "Wind Speed: " + windSpeed + " MPH";

    //call variables to show data changes 
    cityName.text(cityLable);
    tempS.text(tempLable);
    humRead.text(humLable);
    windS.text(windLable);
  }

});

