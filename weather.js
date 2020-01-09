
$(document).ready(function () {

  var citySearch = $("#city-search");
  var searchArea = $("#search-input");
  var btnSearch = $("#btn");
  var currentCity = $("#current-city");
  var cityName = $(".city");
  var dateN = $(".date");
  var windS = $(".wind");
  var tempS = $(".temp");
  var humRead = $(".humidity")
  var uvIdex = $(".UV");
  var imgN = $(".img");
  searchArea = "";

  var d = moment().format('L');

  console.log(d);

  var ciytInfo

  //API key to run database
  var APIKey = "351b80106cd356a907301219dd0c7806";

  //  API URL to query database 
  var queryURL = "https://api.openweathermap.org/data/2.5/weather?q=" + searchArea + ",Burundi&units=imperial&appid=" + APIKey;


  // var queryURL = "https://api.openweathermap.org/data/2.5/weather?" +
  //     "q=Bujumbura,Burundi&units=imperial&appid=" + APIKey;



  // AJAX call to the run OpenWeatherMap API
  $.ajax({
    url: queryURL,
    method: "GET"
  })
    // We store all of the retrieved data inside of an object called "response"
    .then(function (response) {

      console.log(queryURL);

      // Log the resulting object
      console.log(response);
      console.log(response.main.temp);
      // $(".city").html("<h1>" + response.name + " Weather Details</h1>");


      $("#btn").on("click", function (event) {
        event.preventDefault();

        // This line get the info from the text area
        var ciytInfo = $("#search-input").val().trim();


        localStorage.setItem(ciytInfo, searchArea);

        var userSelection = localStorage.getItem("cityInfo");
        console.log(ciytInfo);

        $("#current-city").append(ciytInfo);

        //current city information  
        $(".city").text("Current City: " + response.name + " " + "(" + d + ")");
        $(".img").text("Icon: " + response.main.icon);
        $(".humidity").text("Humidity: ")
        $(".temp").text("Temperature: " + response.main.temp + " F");
        $(".wind").text("Wind Speed: " + response.wind.speed + " MPH");
        $(".UV").text("UV Index: ")

      });

    });
})

