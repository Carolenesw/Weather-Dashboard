
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
  var cityName = [];
  //searchArea = "";

  // use moment.js to get date format
  var d = moment().format('L');

  console.log(d);


  //API key to run database
  var APIKey = "351b80106cd356a907301219dd0c7806";


  // AJAX call to the run OpenWeatherMap API

  //console.log(queryURL);

  // Log the resulting object

  $("#btn").on("click", function (event) {
    event.preventDefault();

    // This line get the info from the text area
    searchArea = $("#search-input").val().trim();



    var userSelection = localStorage.getItem("cityName");

    var queryURL = "https://api.openweathermap.org/data/2.5/weather?q=" + searchArea + "&units=imperial&appid=" + APIKey;
    $.ajax({
      url: queryURL,
      method: "GET"
    })
      // We store all of the retrieved data inside of an object called "response"
      .then(function (response) {
        console.log(response);

        localStorage.setItem("cityName", searchArea); 
        // localStorage.setItem("TempS", response.main.temp);
        localStorage.setItem("Temperature: ", response.wind.speed + " F");
        localStorage.setItem("Humidity: ", response.main.humidity);
        // localStorage.setItem("Wind Speed: " + response.wind.speed + " MPH");
        localStorage.setItem("Wind Speed: ", response.wind.speed + " MPH");
        



        $(".city").text(response.name + " " + "(" + d + ")");
        $(".img").text("Icon: " + response.main.icon);
        
        // // var temp = localStorage.getItem("Temperature:");
        // console.log("Temp: "+temp);
        // $(".temp").text("Temperature:" +temp);
        $(".temp").text("Temperature: " + response.main.temp + " F");
        $(".humidity").text("Humidity: " + response.main.humidity);
        $(".wind").text("Wind Speed: " + response.wind.speed + " MPH");
        $(".UV").text("UV Index: ");


      });

    
  });

});

