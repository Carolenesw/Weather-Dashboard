
//weather API key 
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
